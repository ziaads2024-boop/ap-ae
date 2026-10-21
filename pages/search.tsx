import type { GetServerSideProps } from 'next';
import { findClinicsUrl, searchInputFromQuery } from '@/lib/searchUrl';

// Search lives at /find-clinics/; this old URL forwards its filters there.
export default function SearchRedirect() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  redirect: { destination: findClinicsUrl(searchInputFromQuery(query)), permanent: true },
});
