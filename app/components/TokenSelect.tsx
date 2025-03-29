'use client';

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
];

export default function TokenSelect({ selectedToken, onSelect, label }: TokenSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-[14px] text-[rgb(119,128,160)] font-medium">{label}</span>
      </div>
      <button
        onClick={() => {
          // In a full implementation, this would open a token selection modal
          const nextToken = COMMON_TOKENS.find(t => t !== selectedToken) || COMMON_TOKENS[0];
          onSelect(nextToken);
        }}
        className="group flex items-center gap-1 py-1.5 pl-1 pr-2 rounded-[20px] hover:bg-[rgb(237,238,242)] transition-colors"
      >
        {selectedToken ? (
          <>
            <div className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[rgb(237,238,242)]">
              <span className="text-lg font-medium text-black">
                {selectedToken.symbol.charAt(0)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[20px] font-medium text-black">
                {selectedToken.symbol}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[rgb(119,128,160)] group-hover:text-[rgb(255,0,199)]">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </>
        ) : (
          <div className="px-2 py-2 font-medium">
            <span className="text-[rgb(255,0,199)] hover:text-[rgb(255,0,199)] text-base">
              Select token
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="ml-1 inline text-[rgb(119,128,160)] group-hover:text-[rgb(255,0,199)]">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </button>
    </div>
  );
}
