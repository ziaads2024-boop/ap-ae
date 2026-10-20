-- Restrict content tables and storage buckets that any signed-in user (anyone
-- can sign up) or anon could write.

-- Roles that can open /admin (pages/admin.tsx) plus public.is_admin()'s roles.
CREATE OR REPLACE FUNCTION public.has_admin_access(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role::text IN ('super_admin', 'district_manager', 'platform_admin', 'content_moderator')
  )
$$;

-- ---------------------------------------------------------------------------
-- Blog / editorial tables: "manage" policies only required auth.uid() IS NOT
-- NULL / auth.role() = 'authenticated'. Public read policies are unchanged.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Authenticated users can manage blog authors" ON public.blog_authors;
CREATE POLICY "Admins manage blog authors" ON public.blog_authors
  FOR ALL TO authenticated
  USING (public.has_admin_access(auth.uid()))
  WITH CHECK (public.has_admin_access(auth.uid()));

DROP POLICY IF EXISTS "Authenticated users can manage blog categories" ON public.blog_categories;
CREATE POLICY "Admins manage blog categories" ON public.blog_categories
  FOR ALL TO authenticated
  USING (public.has_admin_access(auth.uid()))
  WITH CHECK (public.has_admin_access(auth.uid()));

DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.blog_content_templates;
CREATE POLICY "Admins manage blog content templates" ON public.blog_content_templates
  FOR ALL TO authenticated
  USING (public.has_admin_access(auth.uid()))
  WITH CHECK (public.has_admin_access(auth.uid()));

DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.editorial_calendar;
CREATE POLICY "Admins manage editorial calendar" ON public.editorial_calendar
  FOR ALL TO authenticated
  USING (public.has_admin_access(auth.uid()))
  WITH CHECK (public.has_admin_access(auth.uid()));

-- ---------------------------------------------------------------------------
-- Storage: the "Service role can ..." policies only checked bucket_id, so anon
-- could upload/overwrite blog images, clinic assets and (FOR ALL, incl. delete)
-- the static pages served by serve-static. The service role bypasses RLS and
-- does not need them. Public read policies are unchanged.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Service role can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Service role can update blog images" ON storage.objects;
CREATE POLICY "Admins manage blog images" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_admin_access(auth.uid()))
  WITH CHECK (bucket_id = 'blog-images' AND public.has_admin_access(auth.uid()));

DROP POLICY IF EXISTS "Service role can manage static pages" ON storage.objects;
CREATE POLICY "Admins manage static pages" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'static-pages' AND public.has_admin_access(auth.uid()))
  WITH CHECK (bucket_id = 'static-pages' AND public.has_admin_access(auth.uid()));

-- Dentist dashboard uploads to clinic-assets/<clinic_id>/... (ProfileEditorTab,
-- TeamMemberFormDialog); allow that only for the clinic's owner or admins.
DROP POLICY IF EXISTS "Service role can upload clinic assets" ON storage.objects;
DROP POLICY IF EXISTS "Service role can update clinic assets" ON storage.objects;

CREATE POLICY "Clinic owners upload clinic assets" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'clinic-assets'
    AND (
      public.has_admin_access(auth.uid())
      OR EXISTS (
        SELECT 1 FROM public.clinics c
        WHERE c.id::text = (storage.foldername(name))[1]
          AND c.claimed_by = auth.uid()
      )
    )
  );

CREATE POLICY "Clinic owners update clinic assets" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'clinic-assets'
    AND (
      public.has_admin_access(auth.uid())
      OR EXISTS (
        SELECT 1 FROM public.clinics c
        WHERE c.id::text = (storage.foldername(name))[1]
          AND c.claimed_by = auth.uid()
      )
    )
  )
  WITH CHECK (
    bucket_id = 'clinic-assets'
    AND (
      public.has_admin_access(auth.uid())
      OR EXISTS (
        SELECT 1 FROM public.clinics c
        WHERE c.id::text = (storage.foldername(name))[1]
          AND c.claimed_by = auth.uid()
      )
    )
  );
