"use client";

import '@rainbow-me/rainbowkit/styles.css';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';

import {
  WagmiConfig,
  createConfig,
  configureChains,
} from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const projectId = "21d01d1f13a401a1468af3a4b576d8c1"; 

const { chains, publicClient } = configureChains(
  [sepolia],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains, projectId }),
      coinbaseWallet({ chains, appName: 'Web3 Membership' }),
      walletConnectWallet({ chains, projectId }), // ← ini WAJIB ada
      rainbowWallet({ chains, projectId }),       // ← ini WAJIB juga
    ],
  },
]);

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
