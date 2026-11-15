import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png?v=5" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png?v=5" />
          <link rel="manifest" href="/site.webmanifest?v=5" />
          <meta name="msapplication-TileColor" content="#0A0A0A" />
          <meta name="theme-color" content="#0A0A0A" />

          {/* Geo targeting */}
          <meta name="geo.region" content="AE" />
          <meta name="geo.placename" content="United Arab Emirates" />

          {/* Google Search Console Verification */}
          <meta name="google-site-verification" content="QXeUyCI6vHRD4bv5ZLJCYQVSvESe4uqju4tWaamlr2A" />
          <meta name="google-site-verification" content="rRYuAOlERaQwgPvDUKyirGO1QMVjD43uY-eXEPn--OM" />

          {/* Critical preconnects for LCP */}
          <link rel="dns-prefetch" href="https://eneuthbghipsdvsqilmb.supabase.co" />

          {/* Site-wide entities. Page schema refers to these by @id. */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": "https://www.appointpanda.ae/#organization",
                    "name": "AppointPanda",
                    "url": "https://www.appointpanda.ae/",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://www.appointpanda.ae/logo.png",
                      "width": 512,
                      "height": 512,
                    },
                    "image": "https://www.appointpanda.ae/og-image.png",
                    "description": "AppointPanda is a directory of dental clinics in Dubai, with treatment guides and costs in AED. Patients compare clinics and send appointment requests; it is not a clinic and does not provide treatment.",
                    "areaServed": { "@type": "City", "name": "Dubai" },
                    "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
                    "contactPoint": {
                      "@type": "ContactPoint",
                      "contactType": "customer support",
                      "email": "hello@appointpanda.ae",
                      "url": "https://www.appointpanda.ae/contact/",
                      "availableLanguage": ["English"],
                    },
                  },
                  {
                    "@type": "WebSite",
                    "@id": "https://www.appointpanda.ae/#website",
                    "url": "https://www.appointpanda.ae/",
                    "name": "AppointPanda",
                    "inLanguage": "en-AE",
                    "publisher": { "@id": "https://www.appointpanda.ae/#organization" },
                    "potentialAction": {
                      "@type": "SearchAction",
                      "target": { "@type": "EntryPoint", "urlTemplate": "https://www.appointpanda.ae/find-clinics/?q={search_term_string}" },
                      "query-input": "required name=search_term_string",
                    },
                  },
                ],
              }),
            }}
          />
        </Head>
        <body className="min-h-screen bg-background font-sans antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
