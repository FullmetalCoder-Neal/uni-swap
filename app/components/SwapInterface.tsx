'use client';

import { useState } from 'react';
import TokenSelect from './TokenSelect';
import { parseUnits, formatUnits } from 'viem';

interface Token {
  symbol: string;
  address: string;
  decimals: number;
  logoURI?: string;
}

export default function SwapInterface() {
  const [fromToken, setFromToken] = useState<Token>();
  const [toToken, setToToken] = useState<Token>();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const handleSwap = async () => {
    if (!fromToken || !toToken || !fromAmount) return;
    console.log('Swapping', fromAmount, fromToken.symbol, 'to', toToken.symbol);
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      <div className="p-0.5 rounded-[24px] bg-[rgb(245,246,252)]">
        <div className="relative rounded-[24px] p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-medium text-black">Swap</h2>
          </div>
          
          {/* From token section */}
          <div className="relative p-4 rounded-2xl bg-[rgb(245,246,252)]">
          <div className="flex justify-between items-end gap-2">
              <div className="flex-1">
                <span className="text-sm text-[rgb(119,128,160)]">Sell</span>
                <input
                  type="number"
                  className="w-full bg-transparent text-[36px] font-medium text-black placeholder-[rgba(0,0,0,0.3)] mt-2 focus:outline-none"
                  placeholder="0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                />
              </div>
              <div className="flex-none">
                <TokenSelect
                  selectedToken={fromToken}
                  onSelect={setFromToken}
                  label=""
                />
              </div>
            </div>
          </div>

          {/* Swap direction button */}
          <div className="flex justify-center -my-2.5 relative z-10">
            <button
              className="group w-8 h-8 rounded-full bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              onClick={() => {
                setFromToken(toToken);
                setToToken(fromToken);
                setFromAmount(toAmount);
                setToAmount(fromAmount);
              }}
            >
              <div className="flex items-center justify-center w-full h-full rotate-0 group-hover:rotate-180 transition-transform duration-200">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10L8 14L12 10" stroke="rgb(119,128,160)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6L8 2L4 6" stroke="rgb(119,128,160)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>

          {/* To token section */}
          <div className="relative p-4 rounded-2xl bg-[rgb(245,246,252)]">
          <div className="flex justify-between items-end gap-2">
              <div className="flex-1">
                <span className="text-sm text-[rgb(119,128,160)]">Buy</span>
                <input
                  type="number"
                  className="w-full bg-transparent text-[36px] font-medium text-black placeholder-[rgba(0,0,0,0.3)] mt-2 focus:outline-none"
                  placeholder="0"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                />
              </div>
              <div className="flex-none">
                <TokenSelect
                  selectedToken={toToken}
                  onSelect={setToToken}
                  label=""
                />
              </div>
            </div>
          </div>

          {/* Swap button */}
          <button
            className="w-full mt-4 py-4 px-6 rounded-[12px] text-[16px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[rgb(245,246,252)] disabled:text-[rgb(100,100,100)] bg-[rgb(255,0,199)] text-white hover:opacity-[0.85] transition-opacity"
            disabled={!fromToken || !toToken || !fromAmount || fromAmount === '0'}
            onClick={handleSwap}
          >
            {!fromToken || !toToken 
              ? 'Select tokens' 
              : !fromAmount 
              ? 'Enter an amount' 
              : 'Swap'}
          </button>
        </div>
      </div>
    </div>
  );
}
