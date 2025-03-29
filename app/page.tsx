'use client';

import WalletConnect from './components/WalletConnect';
import SwapInterface from './components/SwapInterface';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen w-full bg-white">
      {/* Navigation bar with blur effect */}
      <nav className="sticky top-0 z-50 w-full border-b border-[rgba(0,0,0,0.08)] bg-white/80 backdrop-blur-[20px]">
        <div className="flex h-[72px] justify-between items-center max-w-[1440px] mx-auto px-4">
          <div className="flex items-center gap-8">
            <span className="bg-gradient-to-r from-[rgb(255,0,199)] to-[rgb(0,163,255)] bg-clip-text text-transparent text-[24px] font-semibold">
              Uniswap
            </span>
          </div>
          <WalletConnect />
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-4">
        <div className="pt-[68px]">
        <SwapInterface />
        </div>
      </div>
      {/* <div className="max-w-[1440px] mx-auto px-4">
        <div className="pt-[68px]">
          {isConnected ? (
            <SwapInterface />
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 pt-[68px]">
              <h1 className="text-[56px] leading-[64px] tracking-[-0.02em] font-medium text-center max-w-[640px] bg-gradient-to-r from-[rgb(255,0,199)] to-[rgb(0,163,255)] bg-clip-text text-transparent">
                Trade crypto and NFTs with confidence
              </h1>
              <p className="text-[rgb(100,100,100)] text-[20px] leading-[28px] text-center">
                Buy, sell, and explore tokens and NFTs
              </p>
            </div>
          )}
        </div>
      </div> */}
    </main>
  );
}
