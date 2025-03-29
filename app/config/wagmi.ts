import { createConfig, http } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, goerli],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
  },
})
