import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Every function deploys with verify_jwt = false (see config.toml), so admin-only
// functions must authenticate the caller themselves.

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * Allow the request only if it carries the service-role key (server-to-server
 * calls) or the access token of a user with an admin role (public.is_admin:
 * super_admin or district_manager).
 *
 * Returns the 401/403 Response to send back, or null when the caller is allowed.
 */
export async function requireAdmin(
  req: Request,
  corsHeaders: Record<string, string>,
): Promise<Response | null> {
  const deny = (status: number, error: string) =>
    new Response(JSON.stringify({ success: false, error }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  const token = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "").trim();
  if (!token) return deny(401, "Unauthorized");

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) return deny(500, "Server configuration error");

  if (timingSafeEqual(token, serviceKey)) return null;

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) return deny(401, "Unauthorized");

  const { data: isAdmin, error: roleError } = await supabase.rpc("is_admin", { _user_id: user.id });
  if (roleError || !isAdmin) return deny(403, "Forbidden: admin access required");

  return null;
}
