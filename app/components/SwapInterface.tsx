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
    
    // TODO: Implement actual swap logic
    console.log('Swapping', fromAmount, fromToken.symbol, 'to', toToken.symbol);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4 bg-white rounded-lg shadow">
      <div className="space-y-4">
        <div className="space-y-2">
          <TokenSelect
            selectedToken={fromToken}
            onSelect={setFromToken}
            label="From"
          />
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.0"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
          />
        </div>

        <button
          className="mx-auto block text-blue-500"
          onClick={() => {
            setFromToken(toToken);
            setToToken(fromToken);
            setFromAmount(toAmount);
            setToAmount(fromAmount);
          }}
        >
          ⇅
        </button>

        <div className="space-y-2">
          <TokenSelect
            selectedToken={toToken}
            onSelect={setToToken}
            label="To"
          />
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.0"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
          />
        </div>
      </div>

      <button
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!fromToken || !toToken || !fromAmount || fromAmount === '0'}
        onClick={handleSwap}
      >
        Swap
      </button>
    </div>
  );
}
