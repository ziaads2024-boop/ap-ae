// Claim-verification helpers shared by send-claim-otp and verify-claim-otp.

/** 6-digit code from a CSPRNG (Math.random is predictable). */
export function generateOtp(): string {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return (100000 + (buf[0] % 900000)).toString();
}

/**
 * claim_requests rows are readable by their owner (RLS), so the code is stored
 * as an HMAC keyed with a server-only secret instead of in plain text.
 */
export async function hashOtp(clinicId: string, userId: string, code: string): Promise<string> {
  const secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(`claim-otp:${clinicId}:${userId}:${code}`));
  return "hmac:" + Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function domainOf(website: string | null | undefined): string | null {
  if (!website) return null;
  try {
    const url = website.startsWith("http") ? website : `https://${website}`;
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * The verification email must belong to the clinic: its email on record, an
 * address in claim_emails, or an address on the clinic website's domain.
 * Otherwise the code proves nothing (callers could send it to themselves).
 */
export function isAllowedClaimEmail(
  target: string,
  clinic: { email?: string | null; website?: string | null; claim_emails?: string[] | null },
): boolean {
  const email = target.trim().toLowerCase();
  const known = [clinic.email, ...(clinic.claim_emails ?? [])]
    .filter((e): e is string => typeof e === "string" && e.length > 0)
    .map((e) => e.trim().toLowerCase());
  if (known.includes(email)) return true;

  const domain = domainOf(clinic.website);
  return Boolean(domain && email.endsWith(`@${domain}`));
}
