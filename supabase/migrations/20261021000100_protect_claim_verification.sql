-- Clinic claim verification hardening.
--
-- RLS lets users insert/update their own claim_requests (the manual-review form
-- upserts directly), which also let them write verification_code /
-- verification_expires_at themselves and then "verify" through verify-claim-otp.
-- Only the service role (send-claim-otp / verify-claim-otp) and admins may set
-- the verification fields or change status away from pending.

CREATE OR REPLACE FUNCTION public.protect_claim_request_verification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF coalesce(auth.role(), '') = 'service_role'
     OR (auth.uid() IS NULL AND session_user IN ('postgres', 'supabase_admin'))
     OR public.is_admin(auth.uid()) THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    NEW.verification_code := NULL;
    NEW.verification_expires_at := NULL;
    NEW.verification_attempts := 0;
    NEW.status := 'pending';
  ELSE
    NEW.clinic_id := OLD.clinic_id;
    NEW.user_id := OLD.user_id;
    NEW.verification_code := OLD.verification_code;
    NEW.verification_expires_at := OLD.verification_expires_at;
    NEW.verification_attempts := OLD.verification_attempts;
    IF NEW.status IS DISTINCT FROM 'pending' THEN
      NEW.status := OLD.status;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_claim_request_verification ON public.claim_requests;
CREATE TRIGGER protect_claim_request_verification
BEFORE INSERT OR UPDATE ON public.claim_requests
FOR EACH ROW EXECUTE FUNCTION public.protect_claim_request_verification();

-- add_clinic_claim_emails is SECURITY DEFINER with no caller check, so anyone
-- could add their own address to a clinic's claim_emails (which send-claim-otp
-- accepts as a verification target). Only email-enrichment (service role) uses it.
REVOKE EXECUTE ON FUNCTION public.add_clinic_claim_emails(uuid, text[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.add_clinic_claim_emails(uuid, text[]) TO service_role;

-- gmb_link_requests: "Users manage own gmb_link_requests" (FOR ALL, no WITH
-- CHECK beyond initiated_by) let any user create a link request for any clinic,
-- which gmb-link-complete then turned into ownership. The older scoped policies
-- (insert only for the initiator's own clinic, read/delete own) remain.
DROP POLICY IF EXISTS "Users manage own gmb_link_requests" ON public.gmb_link_requests;

CREATE POLICY "Admins manage gmb_link_requests"
ON public.gmb_link_requests
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));
