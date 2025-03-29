'use client';

import WalletConnect from './components/WalletConnect';
import SwapInterface from './components/SwapInterface';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex justify-end">
            <WalletConnect />
          </div>
        </div>

        <div className="py-12">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Swap Tokens
          </h1>
          
          {isConnected ? (
            <SwapInterface />
          ) : (
            <div className="text-center text-gray-600">
              Please connect your wallet to start swapping tokens
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
