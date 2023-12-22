"use client"

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID;
const projectId ="93ed7af159d2dcda17b2f7bc22903621"

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId
})

export function Web3ModalProvider({ children }: any) {
  return children;
}
