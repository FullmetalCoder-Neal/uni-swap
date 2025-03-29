'use client';

import { useRef, useEffect } from 'react';

interface Token {
  symbol: string;
  address: string;
  decimals: number;
  logoURI?: string;
}

interface TokenListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  selectedToken?: Token;
}

const COMMON_TOKENS: Token[] = [
  {
    symbol: 'ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
  },
  {
    symbol: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    decimals: 6,
  },
  {
    symbol: 'USDT',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
  },
  {
    symbol: 'DAI',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
  },
  {
    symbol: 'WETH',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    decimals: 18,
  }
];

export default function TokenListModal({ isOpen, onClose, onSelect, selectedToken }: TokenListModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="bg-white rounded-3xl w-full max-w-[420px] max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-[rgb(232,236,251)]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-black">Select a token</h2>
            <button 
              onClick={onClose}
              className="p-1 hover:opacity-70"
            >
              ✕
            </button>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search name or paste address"
              className="w-full px-4 py-3 bg-[rgb(245,246,252)] rounded-2xl text-base text-black placeholder-[rgb(119,128,160)] outline-none focus:ring-2 focus:ring-[rgb(255,0,199)]"
            />
          </div>
        </div>
        
        <div className="p-2 max-h-[300px] overflow-y-auto">
          {COMMON_TOKENS.map((token) => (
            <button
              key={token.address}
              onClick={() => {
                onSelect(token);
                onClose();
              }}
              className={`w-full flex items-center gap-3 p-2 hover:bg-[rgb(245,246,252)] rounded-xl transition-colors
                ${selectedToken?.address === token.address ? 'bg-[rgb(245,246,252)]' : ''}`}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgb(232,236,251)]">
                <span className="text-base font-medium text-black">
                  {token.symbol.charAt(0)}
                </span>
              </div>
              <span className="text-base font-medium text-black">
                {token.symbol}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
