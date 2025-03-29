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
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <select
          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          value={selectedToken?.address || ''}
          onChange={(e) => {
            const token = COMMON_TOKENS.find(t => t.address === e.target.value);
            if (token) onSelect(token);
          }}
        >
          <option value="">Select token</option>
          {COMMON_TOKENS.map((token) => (
            <option key={token.address} value={token.address}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
