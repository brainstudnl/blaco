import type { AppProps } from 'next/app';
import 'primeicons/primeicons.css';
import { Layout } from '@blaco/components/Layout';
import { PrimeReactProvider } from 'primereact/api';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrimeReactProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PrimeReactProvider>
  );
}
