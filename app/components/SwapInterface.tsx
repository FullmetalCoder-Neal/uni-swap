'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import TokenSelect from './TokenSelect';
import LoadingOverlay from './LoadingOverlay';
import { BrowserProvider } from "ethers";
import { PathSwap__factory, Deployment } from "path-swap-sdk";

const erc20Abi = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
] as const;

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
  const [hasInsufficientBalance, setHasInsufficientBalance] = useState(false);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const [calculationTimer, setCalculationTimer] = useState<NodeJS.Timeout>();
  const [pathSwap, setPathSwap] = useState<any>(null);

  const { address, chainId } = useAccount();

  const { data: ethBalance } = useBalance({
    address: address,
  });

  const { data: tokenBalance } = useContractRead({
    address: fromToken?.address as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  useEffect(() => {
    if (chainId !== undefined && window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const pathSwap = PathSwap__factory.connect(Deployment[chainId].PathSwap.target, provider);
      setPathSwap(pathSwap);
    }
  }, [chainId]);

  useEffect(() => {
    if (!fromToken || !fromAmount || !address) {
      setHasInsufficientBalance(false);
      return;
    }

    try {
      const amount = parseUnits(fromAmount, fromToken.decimals);
      const balance = fromToken.symbol === 'ETH' 
        ? (ethBalance?.value ?? BigInt(0))
        : (tokenBalance as bigint ?? BigInt(0));

      setHasInsufficientBalance(amount > balance);
    } catch (e) {
      setHasInsufficientBalance(false);
    }
  }, [fromToken, fromAmount, address, ethBalance, tokenBalance]);

  // 使用防抖处理输入变化
  const debouncedCalculation = useCallback(
    (value: string) => {
      if (calculationTimer) {
        clearTimeout(calculationTimer);
      }

      if (value && fromToken && toToken) {
        setIsCalculatingRoute(true);
        setToAmount('');
        
        const timer = setTimeout(() => {
          setIsCalculatingRoute(false);
          setToAmount(value); // 这里应该是实际的计算结果
        }, 3000);
        
        setCalculationTimer(timer);
      }
    },
    [fromToken, toToken]
  );

  // 使用防抖处理输入变化
  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedCalculation(fromAmount);
    }, 500); // 500ms 防抖延迟

    return () => clearTimeout(timer);
  }, [fromAmount, debouncedCalculation]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (calculationTimer) {
        clearTimeout(calculationTimer);
      }
    };
  }, []);

  const handleSwap = async () => {
    if (!fromToken || !toToken || !fromAmount) return;
    console.log('Swapping', fromAmount, fromToken.symbol, 'to', toToken.symbol);
  };

  return (
    <>
      {isCalculatingRoute && (
        <LoadingOverlay text="Calculating best trading route..." />
      )}
      <div className="w-full max-w-[480px] mx-auto">
        <div className="rounded-[24px] bg-white border border-[rgb(210,217,238)]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-medium text-black">Swap</h2>
            </div>
            
            {/* From token section */}
            <div className="relative p-4 rounded-2xl bg-[rgb(245,246,252)]">
              <span className="text-sm text-[rgb(119,128,160)]">You pay</span>
              <div className="relative flex items-center gap-2 mt-2">
                <div className="flex-1 min-w-0">
                  <input
                    type="number"
                    className={`w-full bg-transparent text-[36px] font-medium placeholder-[rgba(0,0,0,0.3)] focus:outline-none ${
                      hasInsufficientBalance ? 'text-[rgb(255,0,122)]' : 'text-black'
                    }`}
                    placeholder="0"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                  />
                </div>
                <div className="flex-shrink-0">
                  <TokenSelect
                    selectedToken={fromToken}
                    onSelect={setFromToken}
                    label=""
                  />
                </div>
              </div>
              {fromToken && fromAmount && address && (
                <div className="mt-1 text-sm">
                  <span className={hasInsufficientBalance ? 'text-[rgb(255,0,122)]' : 'text-[rgb(119,128,160)]'}>
                    Balance: {fromToken.symbol === 'ETH'
                      ? formatUnits(ethBalance?.value ?? BigInt(0), 18)
                      : formatUnits(tokenBalance as bigint ?? BigInt(0), fromToken.decimals)}
                  </span>
                </div>
              )}
            </div>

            {/* Swap direction button */}
            <div className="flex justify-center -my-2.5 relative z-10">
              <button
                className="group w-8 h-8 rounded-full bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center border border-[rgb(210,217,238)]"
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
              <span className="text-sm text-[rgb(119,128,160)]">You receive</span>
              <div className="relative flex items-center gap-2 mt-2">
                <div className="flex-1 min-w-0">
                  <input
                    type="number"
                    className="w-full bg-transparent text-[36px] font-medium text-black placeholder-[rgba(0,0,0,0.3)] focus:outline-none"
                    placeholder="0"
                    value={toAmount}
                    readOnly
                  />
                </div>
                <div className="flex-shrink-0">
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
              disabled={!fromToken || !toToken || !fromAmount || fromAmount === '0' || hasInsufficientBalance || isCalculatingRoute}
              onClick={handleSwap}
            >
              {!fromToken || !toToken 
                ? 'Select tokens' 
                : !fromAmount 
                ? 'Enter an amount'
                : isCalculatingRoute
                ? 'Calculating...'
                : hasInsufficientBalance
                ? 'Insufficient balance'
                : 'Swap'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
