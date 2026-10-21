import type { GetServerSideProps } from 'next';
import { canonicalTreatment, serviceBySlug, urls } from '@/content';

// The old emirate comparison pages were thin templates. Send visitors to the
// treatment guide (which compares costs) or the emirates overview.
export default function CompareRedirect() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const first = String((params?.slug as string[] | undefined)?.[0] || '');
  const service = serviceBySlug(canonicalTreatment(first));
  return { redirect: { destination: service ? urls.service(service.slug) : urls.emirates, permanent: true } };
};
