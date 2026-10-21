import type { GetServerSideProps } from 'next';

// Replaced by the insurance guide, which lists clinics that confirmed each plan.
export default function InsuranceCheckerRedirect() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: { destination: '/insurance/', permanent: true },
});
