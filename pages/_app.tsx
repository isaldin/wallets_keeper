import '../styles/globals.css';

import { InjectedConnector } from '@wagmi/core';
import type { AppProps } from 'next/app';
import { configureChains, createClient, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import Header from '../components/common/Header';
import { DataSourceContextProvider } from '../contexts/dataSourceContext';
import { RuntimePasswordContextProvider } from '../contexts/runtimePasswordContext';

export default function App({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(defaultChains, [publicProvider()]);

  const client = createClient({
    provider,
    connectors: [new InjectedConnector({ chains })],
    autoConnect: true,
  });

  return (
    <WagmiConfig client={client}>
      <Header />
      <div className="p-4 max-w-2xl">
        <DataSourceContextProvider>
          <RuntimePasswordContextProvider>
            <Component {...pageProps} />
          </RuntimePasswordContextProvider>
        </DataSourceContextProvider>
      </div>
    </WagmiConfig>
  );
}
