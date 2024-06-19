import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          id="theme-link"
          rel="stylesheet"
          href="/themes/lara-dark-purple/theme.css"
        />
        <meta name="application-name" content="Blaco" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#FF6E32" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#121212" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
