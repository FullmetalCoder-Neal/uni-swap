'use client';

import { useState } from 'react';
import TokenListModal from './TokenListModal';

interface Token {
  symbol: string;
  address: string;
  decimals: number;
  logoURI?: string;
}

interface TokenSelectProps {
  selectedToken?: Token;
  onSelect: (token: Token) => void;
  label: string;
}

export default function TokenSelect({ selectedToken, onSelect, label }: TokenSelectProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center h-[40px] gap-2 py-1.5 px-2 hover:bg-[rgb(232,236,251)] rounded-[20px] transition-colors group"
      >
        {selectedToken ? (
          <>
            <div className="flex items-center justify-center w-[28px] h-[28px] rounded-full bg-[rgb(237,238,242)]">
              <span className="text-base font-medium text-black">
                {selectedToken.symbol.charAt(0)}
              </span>
            </div>
            <span className="text-[18px] font-medium text-black min-w-[40px]">
              {selectedToken.symbol}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[rgb(119,128,160)] group-hover:text-[rgb(255,0,199)]">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        ) : (
          <div className="flex items-center gap-1 px-3 py-2 bg-[rgb(232,236,251)] rounded-[20px] hover:bg-[rgb(220,224,244)] transition-colors">
            <span className="text-[16px] font-semibold text-[rgb(255,0,199)]">
              Select token
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[rgb(119,128,160)] group-hover:text-[rgb(255,0,199)]">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </button>

      <TokenListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={onSelect}
        selectedToken={selectedToken}
      />
    </div>
  );
}
