// src/pages/_app.tsx

import type { AppProps } from 'next/app';
import Script from 'next/script';
import Head from 'next/head';

// You can import global styles here if you create a global.css file
// import '@/styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>API Summary Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* 
        The next/script component handles loading the external LivePerson SDK.
        - strategy="afterInteractive": Loads the script after the page becomes interactive, 
          which is a good balance for performance.
      */}
      <Script
        src="https://lpcdn.lpsnmedia.net/webagent/client-SDK.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("LivePerson Client SDK script loaded.");
        }}
        onError={(e) => {
          console.error("Failed to load LivePerson Client SDK script:", e);
        }}
      />
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
