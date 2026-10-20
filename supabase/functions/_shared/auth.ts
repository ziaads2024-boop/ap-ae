import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Every function deploys with verify_jwt = false (see config.toml), so functions
// that act with the service-role key must authenticate the caller themselves.

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Roles that can open /admin (pages/admin.tsx) plus public.is_admin()'s roles.
export const ADMIN_ROLES = ["super_admin", "district_manager", "platform_admin", "content_moderator"];
// For tools that dump, migrate or bulk-overwrite the whole database.
export const SUPER_ADMIN_ONLY = ["super_admin"];

type Caller =
  | { kind: "service" }
  | { kind: "user"; userId: string; roles: string[]; supabase: ReturnType<typeof createClient> }
  | { kind: "denied"; response: Response };

async function resolveCaller(req: Request, corsHeaders: Record<string, string>): Promise<Caller> {
  const deny = (status: number, error: string): Caller => ({
    kind: "denied",
    response: new Response(JSON.stringify({ success: false, error }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }),
  });

  const token = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "").trim();
  if (!token) return deny(401, "Unauthorized");

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) return deny(500, "Server configuration error");

  if (timingSafeEqual(token, serviceKey)) return { kind: "service" };

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) return deny(401, "Unauthorized");

  const { data: roleRows } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
  const roles = (roleRows ?? []).map((r: { role: string }) => r.role);
  return { kind: "user", userId: user.id, roles, supabase };
}

function forbidden(corsHeaders: Record<string, string>, error: string): Response {
  return new Response(JSON.stringify({ success: false, error }), {
    status: 403,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/**
 * Allow the request only if it carries the service-role key (server-to-server
 * calls) or the access token of a user holding one of `roles`.
 *
 * Returns the 401/403 Response to send back, or null when the caller is allowed.
 */
export async function requireAdmin(
  req: Request,
  corsHeaders: Record<string, string>,
  roles: string[] = ADMIN_ROLES,
): Promise<Response | null> {
  const caller = await resolveCaller(req, corsHeaders);
  if (caller.kind === "denied") return caller.response;
  if (caller.kind === "service" || caller.roles.some((r) => roles.includes(r))) return null;
  return forbidden(corsHeaders, "Forbidden: admin access required");
}

/**
 * Like requireAdmin, but also allows the dentist who owns (claimed) the clinic
 * (public.owns_clinic).
 */
export async function requireClinicAccess(
  req: Request,
  corsHeaders: Record<string, string>,
  clinicId: string | null | undefined,
): Promise<Response | null> {
  const caller = await resolveCaller(req, corsHeaders);
  if (caller.kind === "denied") return caller.response;
  if (caller.kind === "service" || caller.roles.some((r) => ADMIN_ROLES.includes(r))) return null;
  if (!clinicId) return forbidden(corsHeaders, "Forbidden: clinic access required");

  const { data: owns } = await caller.supabase.rpc("owns_clinic", {
    _user_id: caller.userId,
    _clinic_id: clinicId,
  });
  return owns === true ? null : forbidden(corsHeaders, "Forbidden: clinic access required");
}
