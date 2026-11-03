import Head from 'next/head';
import dynamic from 'next/dynamic';

// Private, token-based page: served as a static shell and rendered in the browser,
// so visits do not run a server function.
const ReviewRequestPage = dynamic(() => import('@/pages/ReviewRequestPage'), { ssr: false });

export default function ReviewRequestPageWrapper() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <ReviewRequestPage />
    </>
  );
}
