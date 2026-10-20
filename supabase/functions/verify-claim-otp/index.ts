import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { hashOtp } from "../_shared/claim-otp.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const VerifyOTPSchema = z.object({
  clinicId: z.string().uuid("Invalid clinic ID format"),
  code: z.string()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only digits"),
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid authentication" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse and validate input
    const body = await req.json();
    const validationResult = VerifyOTPSchema.safeParse(body);
    
    if (!validationResult.success) {
      // Log detailed errors server-side only
      console.error("Validation error:", validationResult.error.issues);
      return new Response(JSON.stringify({ 
        error: "Invalid request. Please check your input and try again."
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { clinicId, code } = validationResult.data;

    // Get claim request
    const { data: claimRequest, error: claimError } = await supabaseClient
      .from("claim_requests")
      .select("*")
      .eq("clinic_id", clinicId)
      .eq("user_id", user.id)
      .eq("status", "pending")
      .maybeSingle();

    if (claimError || !claimRequest) {
      return new Response(JSON.stringify({ error: "No pending claim request found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check expiry
    if (!claimRequest.verification_expires_at || new Date(claimRequest.verification_expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: "Verification code has expired" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check attempts
    if (claimRequest.verification_attempts >= 5) {
      return new Response(JSON.stringify({ error: "Too many attempts. Please request a new code." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Increment attempts
    await supabaseClient
      .from("claim_requests")
      .update({ verification_attempts: (claimRequest.verification_attempts || 0) + 1 })
      .eq("id", claimRequest.id);

    // Verify code (stored as an HMAC, see _shared/claim-otp.ts)
    if (!claimRequest.verification_code || claimRequest.verification_code !== await hashOtp(clinicId, user.id, code)) {
      return new Response(JSON.stringify({ error: "Invalid verification code" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Success! Claim the clinic, but never take it over from another owner
    const { data: claimedClinic, error: clinicUpdateError } = await supabaseClient
      .from("clinics")
      .update({
        claim_status: "claimed",
        claimed_by: user.id,
        claimed_at: new Date().toISOString(),
      })
      .eq("id", clinicId)
      .or(`claimed_by.is.null,claimed_by.eq.${user.id}`)
      .select("id")
      .maybeSingle();

    if (clinicUpdateError || !claimedClinic) {
      return new Response(JSON.stringify({ error: "This profile has already been claimed. Please contact support." }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabaseClient
      .from("claim_requests")
      .update({ status: "approved", verification_code: null })
      .eq("id", claimRequest.id);

    // Add dentist role if not exists
    const { data: existingRole } = await supabaseClient
      .from("user_roles")
      .select("id")
      .eq("user_id", user.id)
      .eq("role", "dentist")
      .single();

    if (!existingRole) {
      await supabaseClient.from("user_roles").insert({
        user_id: user.id,
        role: "dentist",
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Profile claimed successfully!" 
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in verify-claim-otp:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
