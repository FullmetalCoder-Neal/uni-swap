'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <button
          className="flex items-center px-3 h-[36px] rounded-[20px] bg-[rgb(245,246,252)] hover:bg-[rgb(232,236,251)] transition-colors"
        >
          <span className="text-[14px] font-medium text-[rgb(119,128,160)]">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </button>
        <button
          onClick={() => disconnect()}
          className="flex items-center h-[36px] px-3 rounded-[20px] bg-[rgb(245,246,252)] hover:bg-[rgb(232,236,251)] transition-colors"
        >
          <span className="text-[14px] font-medium text-[rgb(255,0,199)]">
            Disconnect
          </span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="h-[40px] px-4 rounded-[20px] text-[16px] font-semibold bg-[rgb(255,0,199)] hover:opacity-[0.85] transition-opacity text-white"
    >
      Connect Wallet
    </button>
  );
}
