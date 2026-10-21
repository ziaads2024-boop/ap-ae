-- Indexes for the queries public pages run (clinic profiles, area pages,
-- search). Names match earlier migrations where those exist, so this is a
-- no-op on databases that already have them.

CREATE INDEX IF NOT EXISTS idx_clinics_slug ON public.clinics (slug);
CREATE INDEX IF NOT EXISTS idx_clinics_city ON public.clinics (city_id);
CREATE INDEX IF NOT EXISTS idx_clinics_active_reviews ON public.clinics (is_active, review_count DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_dentists_clinic ON public.dentists (clinic_id);
CREATE INDEX IF NOT EXISTS idx_clinic_treatments_clinic ON public.clinic_treatments (clinic_id);
CREATE INDEX IF NOT EXISTS idx_clinic_treatments_treatment ON public.clinic_treatments (treatment_id);
CREATE INDEX IF NOT EXISTS idx_clinic_insurances_clinic_id ON public.clinic_insurances (clinic_id);
CREATE INDEX IF NOT EXISTS idx_clinic_insurances_insurance_id ON public.clinic_insurances (insurance_id);
CREATE INDEX IF NOT EXISTS idx_clinic_images_clinic ON public.clinic_images (clinic_id);
CREATE INDEX IF NOT EXISTS idx_clinic_hours_clinic ON public.clinic_hours (clinic_id);
CREATE INDEX IF NOT EXISTS idx_google_reviews_clinic_time ON public.google_reviews (clinic_id, review_time DESC);
CREATE INDEX IF NOT EXISTS idx_review_funnel_clinic_event ON public.review_funnel_events (clinic_id, event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_seo_pages_slug ON public.seo_pages (slug);
CREATE INDEX IF NOT EXISTS idx_appointments_unassigned ON public.appointments (is_assigned);
