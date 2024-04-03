import {
    connectorsForWallets,
    getDefaultWallets,
  } from '@rainbow-me/rainbowkit';
  import {
    argentWallet,
    imTokenWallet,
    ledgerWallet,
    omniWallet,
    trustWallet,
  } from '@rainbow-me/rainbowkit/wallets';
  import { configureChains, createClient, WagmiConfig } from 'wagmi';
  import { arbitrum, bsc, mainnet, optimism, polygon } from 'wagmi/chains';
  import { alchemyProvider } from 'wagmi/providers/alchemy';
  import { publicProvider } from 'wagmi/providers/public';
  import React, { ReactNode } from 'react';

  export const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum, bsc],
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || '' }),
      publicProvider(),
    ]
  );
  
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c9dc1818b014595e86d4e5e1effe46cf';
  
  const { wallets } = getDefaultWallets({
    appName: 'rainbowkit.com',
    chains,
    projectId,
  });
  
  const connectors = connectorsForWallets([
    ...wallets,
    {
      groupName: 'More',
      wallets: [
        argentWallet({ chains, projectId }),
        trustWallet({ chains, projectId }),
        omniWallet({ chains, projectId }),
        imTokenWallet({ chains, projectId }),
        ledgerWallet({ chains, projectId }),
      ],
    },
  ]);
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  
  export function Provider({ children }: { children: ReactNode }) {
    return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
  }
  