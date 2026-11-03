import Head from 'next/head';
import dynamic from 'next/dynamic';

// Private, token-based page: served as a static shell and rendered in the browser,
// so visits do not run a server function.
const PatientFormPage = dynamic(() => import('@/pages/PatientFormPage'), { ssr: false });

export default function FormPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <PatientFormPage />
    </>
  );
}
