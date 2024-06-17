import type { AppProps } from 'next/app';
import Layout from '@blaco/components/Layout';
import '@blaco/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
