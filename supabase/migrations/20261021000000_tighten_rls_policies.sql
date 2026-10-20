-- Tighten RLS policies that later "baseline" migrations re-opened.
--
-- Several migrations (20260216*, 20260217*, 20260622000001, 2026_04_10_*) added
-- blanket USING (true) policies next to the scoped ones that already existed.
-- Policies are permissive (OR-ed), so the blanket ones won. Dropping them
-- restores the scoped policies; replacements are added only where the app
-- still needs the access.

-- ---------------------------------------------------------------------------
-- global_settings: holds Twilio/WhatsApp/SMTP/Google OAuth credentials and API
-- keys (see ApiControlTab). Public read must be limited to the keys the public
-- site uses (same idea as 20260120141907, which the later policies undid).
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can view global settings" ON public.global_settings;
DROP POLICY IF EXISTS "Settings readable by all" ON public.global_settings;
DROP POLICY IF EXISTS "Public read global_settings" ON public.global_settings;

CREATE POLICY "Public read global_settings"
ON public.global_settings
FOR SELECT
TO anon, authenticated
USING (
  key = ANY (
    ARRAY[
      'platform',
      'contact_details',
      'social_links',
      'footer_config',
      'legal',
      'header_nav',
      'branding',
      'google_analytics',
      'google_search_console',
      'tracking_pixels',
      'custom_scripts'
    ]::text[]
  )
  OR key LIKE 'pinned\_clinics\_%'
);

-- Non-secret configuration read by the dentist dashboard
CREATE POLICY "Authenticated read dashboard settings"
ON public.global_settings
FOR SELECT
TO authenticated
USING (
  key = ANY (ARRAY['review_funnel_config', 'survey_templates', 'role_permissions', 'tab_visibility']::text[])
  OR key LIKE 'survey\_templates\_%'
);

CREATE POLICY "Admins read global settings"
ON public.global_settings
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- ---------------------------------------------------------------------------
-- clinic_oauth_tokens: the review-funnel policy exposed every clinic's Google
-- access/refresh tokens to anon. Expose only the custom review URL instead.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can read gmb_data for review funnel" ON public.clinic_oauth_tokens;

CREATE OR REPLACE FUNCTION public.get_clinic_review_url(_clinic_id uuid)
RETURNS text
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _data jsonb;
BEGIN
  SELECT gmb_data INTO _data
  FROM public.clinic_oauth_tokens
  WHERE clinic_id = _clinic_id
  LIMIT 1;

  IF _data IS NULL THEN
    RETURN NULL;
  END IF;

  -- gmb_data is sometimes stored as a JSON string
  IF jsonb_typeof(_data) = 'string' THEN
    BEGIN
      _data := (_data #>> '{}')::jsonb;
    EXCEPTION WHEN others THEN
      RETURN NULL;
    END;
  END IF;

  IF jsonb_typeof(_data) <> 'object' THEN
    RETURN NULL;
  END IF;

  RETURN NULLIF(_data ->> 'custom_review_url', '');
END;
$$;

REVOKE ALL ON FUNCTION public.get_clinic_review_url(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_clinic_review_url(uuid) TO anon, authenticated;

-- ---------------------------------------------------------------------------
-- patient_form_submissions: anon could UPDATE any patient's form and insert
-- submissions for any clinic. Patients submit through the patient-form edge
-- function (service role); clinics create submissions from their dashboard.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can update with access_token" ON public.patient_form_submissions;
DROP POLICY IF EXISTS "Anyone can insert submissions with valid token" ON public.patient_form_submissions;
DROP POLICY IF EXISTS "Public insert submissions" ON public.patient_form_submissions;

CREATE POLICY "Clinic owners create submissions"
ON public.patient_form_submissions
FOR INSERT
TO authenticated
WITH CHECK (public.owns_clinic(auth.uid(), clinic_id) OR public.is_admin(auth.uid()));

-- ---------------------------------------------------------------------------
-- seo_pages / page_content: any signed-in user (anyone can sign up) could
-- rewrite or delete every SEO page. Admin policies already exist.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow all for authenticated" ON public.seo_pages;
DROP POLICY IF EXISTS "Allow all for authenticated page_content" ON public.page_content;

-- ---------------------------------------------------------------------------
-- provider_verifications: anon could approve/delete any verification.
-- Keep admin + owner-read policies; let owners submit pending requests.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "provider_verifications_read" ON public.provider_verifications;
DROP POLICY IF EXISTS "provider_verifications_write" ON public.provider_verifications;

CREATE POLICY "Providers submit own verifications"
ON public.provider_verifications
FOR INSERT
TO authenticated
WITH CHECK (status = 'pending' AND public.owns_clinic(auth.uid(), clinic_id));

-- ---------------------------------------------------------------------------
-- platform_notifications: anon could read every user's notifications and
-- write/delete any. Scoped per-user/super-admin policies already exist.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "platform_notifications_read" ON public.platform_notifications;
DROP POLICY IF EXISTS "platform_notifications_write" ON public.platform_notifications;

CREATE POLICY "Admins manage platform notifications"
ON public.platform_notifications
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- ---------------------------------------------------------------------------
-- review_funnel_events: "Public review_funnel" was FOR ALL, so anon could edit
-- or delete any clinic's feedback. Public clinic pages read rating events, so
-- keep public SELECT; insert stays open via "Anyone can insert funnel events".
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public review_funnel" ON public.review_funnel_events;

CREATE POLICY "Public read review funnel events"
ON public.review_funnel_events
FOR SELECT
USING (true);

-- ---------------------------------------------------------------------------
-- slot_locks: slot_locks_write (FOR ALL) let anyone update/delete any lock.
-- Scoped insert/delete/admin policies already exist.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "slot_locks_write" ON public.slot_locks;

-- ---------------------------------------------------------------------------
-- "Service role" policies that were not scoped TO service_role. The service
-- role bypasses RLS, so these only ever granted anon/authenticated access.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Service role can manage static page cache" ON public.static_page_cache;

DROP POLICY IF EXISTS "Service role can manage progress" ON public.static_page_generation_progress;
CREATE POLICY "Admins manage static page progress"
ON public.static_page_generation_progress
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Allow service role full access on visitor_journeys" ON public.visitor_journeys;
DROP POLICY IF EXISTS "Service can update visitor sessions" ON public.visitor_sessions;
