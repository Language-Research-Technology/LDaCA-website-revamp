import Head from 'next/head';
import {ReactNode} from 'react';
import Footer from 'components/branding/Footer';
import Header from 'components/branding/Header';
import {ContentProvider} from 'contexts/ContentProvider';
import Script from 'next/script';

interface layoutProps {
  children: ReactNode;
}

export default function MainLayout({children}: layoutProps) {
  return (
    <ContentProvider>
      <div>
        <Head>
          <title>LDaCA</title>
        </Head>
        {/* Google analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C3GSGXCYV6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-C3GSGXCYV6');
            `}
        </Script>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="container flex-1 py-8">{children}</main>
          <Footer />
        </div>
      </div>
    </ContentProvider>
  );
}
