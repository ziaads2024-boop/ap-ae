import type { GetServerSideProps } from 'next';
import { createServerSupabaseAdmin } from '@/lib/supabaseServer';

// Old direct-booking URL, also used as the "Book" link on clinics' Google
// Business Profiles. Booking now happens on the clinic profile, so forward
// there and open the request form.
export default function BookRedirect() {
  return null;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const key = String(params?.clinicId || '');
  const supabase = createServerSupabaseAdmin();
  if (!supabase || !key) return { notFound: true };
  const { data } = await supabase
    .from('clinics')
    .select('slug')
    .eq(UUID.test(key) ? 'id' : 'slug', key)
    .maybeSingle();
  if (!data?.slug) return { notFound: true };
  return { redirect: { destination: `/clinic/${data.slug}/#request`, permanent: false } };
};
