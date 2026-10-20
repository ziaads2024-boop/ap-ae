-- The "by token" policies only checked manage_token IS NOT NULL. A trigger gives
-- every appointment a token, so anon could read every appointment (patient
-- names, phones, emails, notes, and the tokens themselves) and update any of
-- them. Require the caller to present the matching token in the
-- x-manage-token request header (see createAppointmentTokenClient), the same
-- request.headers pattern the slot_locks policies use.

DROP POLICY IF EXISTS "Anyone can view appointments by token" ON public.appointments;
DROP POLICY IF EXISTS "Anyone can update appointments by token for cancel/reschedule" ON public.appointments;

CREATE POLICY "Token holder can view their appointment"
ON public.appointments
FOR SELECT
TO anon, authenticated
USING (
  manage_token IS NOT NULL
  AND manage_token = (current_setting('request.headers', true)::json ->> 'x-manage-token')
);

CREATE POLICY "Token holder can cancel or reschedule their appointment"
ON public.appointments
FOR UPDATE
TO anon, authenticated
USING (
  manage_token IS NOT NULL
  AND manage_token = (current_setting('request.headers', true)::json ->> 'x-manage-token')
)
WITH CHECK (
  manage_token IS NOT NULL
  AND manage_token = (current_setting('request.headers', true)::json ->> 'x-manage-token')
);
