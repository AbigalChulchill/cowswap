// import ethereumLogoUrl from 'assets/images/ethereum-logo.png'
// import arbitrumLogoUrl from 'assets/svg/arbitrum_logo.svg'
// import optimismLogoUrl from 'assets/svg/optimistic_ethereum.svg'
// import ms from 'ms.macro'

import EthereumLogo from 'assets/cow-swap/network-mainnet-logo.svg' // mod
import RinkebyLogo from 'assets/cow-swap/network-rinkeby-logo.svg' // mod
import GnosisChainLogo from 'assets/cow-swap/network-gnosis-chain-logo.svg' // mod
import BscLogoUrl from 'assets/cow-swap/network-bsc-chain-logo.svg'

export * from '@src/constants/chains'

export enum SupportedChainId {
  MAINNET = 1,
  // ROPSTEN = 3,
  RINKEBY = 4,
  // GOERLI = 5,
  // KOVAN = 42,

  // ARBITRUM_ONE = 42161,
  // ARBITRUM_RINKEBY = 421611,
  // OPTIMISM = 10,
  // OPTIMISTIC_KOVAN = 69,

  BSCTEST = 97,

  XDAI = 100,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  // SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  // SupportedChainId.GOERLI,
  // SupportedChainId.KOVAN,

  // SupportedChainId.ARBITRUM_ONE,
  // SupportedChainId.ARBITRUM_RINKEBY,
  // SupportedChainId.OPTIMISM,
  // SupportedChainId.OPTIMISTIC_KOVAN,

  SupportedChainId.XDAI,

  SupportedChainId.BSCTEST,
]

export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  // SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  // SupportedChainId.GOERLI,
  // SupportedChainId.KOVAN,
  SupportedChainId.XDAI,
  SupportedChainId.BSCTEST,
] as const

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number]

export const L2_CHAIN_IDS = [
  // SupportedChainId.ARBITRUM_ONE,
  // SupportedChainId.ARBITRUM_RINKEBY,
  // SupportedChainId.OPTIMISM,
  // SupportedChainId.OPTIMISTIC_KOVAN,
] as const

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number]

export interface L1ChainInfo {
  readonly blockWaitMsBeforeWarning?: number
  readonly docs: string
  readonly explorer: string
  readonly infoLink: string
  readonly label: string
  readonly logoUrl?: string
  readonly rpcUrls?: string[]
  readonly nativeCurrency: {
    name: string // 'Goerli ETH',
    symbol: string // 'gorETH',
    decimals: number //18,
  }
}
export interface L2ChainInfo extends L1ChainInfo {
  readonly bridge: string
  readonly logoUrl: string
  readonly statusPage?: string
}

export type ChainInfo = { readonly [chainId: number]: (L1ChainInfo & { logoUrl: string }) | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

export const CHAIN_INFO: ChainInfo = {
  /* [SupportedChainId.ARBITRUM_ONE]: {
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://bridge.arbitrum.io/',
    docs: 'https://offchainlabs.com/',
    explorer: 'https://arbiscan.io/',
    infoLink: 'https://info.uniswap.org/#/arbitrum',
    label: 'Arbitrum',
    logoUrl: arbitrumLogoUrl,
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
  },
  [SupportedChainId.ARBITRUM_RINKEBY]: {
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://bridge.arbitrum.io/',
    docs: 'https://offchainlabs.com/',
    explorer: 'https://rinkeby-explorer.arbitrum.io/',
    infoLink: 'https://info.uniswap.org/#/arbitrum/',
    label: 'Arbitrum Rinkeby',
    logoUrl: arbitrumLogoUrl,
    nativeCurrency: { name: 'Rinkeby ArbETH', symbol: 'rinkArbETH', decimals: 18 },
    rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
  }, */
  [SupportedChainId.MAINNET]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://gnosis-protocol.io/mainnet',
    infoLink: '',
    label: 'Ethereum',
    logoUrl: EthereumLogo, // mod
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.RINKEBY]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://gnosis-protocol.io/rinkeby',
    infoLink: '',
    label: 'Rinkeby',
    nativeCurrency: { name: 'Rinkeby ETH', symbol: 'rinkETH', decimals: 18 },
    logoUrl: RinkebyLogo, // mod
  },
  // [SupportedChainId.GOERLI]: {
  //   docs: 'https://docs.uniswap.org/',
  //   explorer: 'https://goerli.etherscan.io/',
  //   infoLink: 'https://info.uniswap.org/#/',
  //   label: 'Görli',
  //   nativeCurrency: { name: 'Görli ETH', symbol: 'görETH', decimals: 18 },
  //   logoUrl: EthereumLogo, // mod
  // },
  /* [SupportedChainId.ROPSTEN]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://ropsten.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ropsten',
    nativeCurrency: { name: 'Ropsten ETH', symbol: 'ropETH', decimals: 18 },
  },
  [SupportedChainId.KOVAN]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://kovan.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Kovan',
    nativeCurrency: { name: 'Kovan ETH', symbol: 'kovETH', decimals: 18 },
  },
  [SupportedChainId.GOERLI]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://goerli.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Görli',
    nativeCurrency: { name: 'Görli ETH', symbol: 'görETH', decimals: 18 },
  },
  [SupportedChainId.OPTIMISM]: {
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://gateway.optimism.io/',
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism',
    label: 'OΞ',
    logoUrl: optimismLogoUrl,
    nativeCurrency: { name: 'Optimistic ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.optimism.io'],
    statusPage: 'https://optimism.io/status',
  },
  [SupportedChainId.OPTIMISTIC_KOVAN]: {
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://gateway.optimism.io/',
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism',
    label: 'Optimistic Kovan',
    rpcUrls: ['https://kovan.optimism.io'],
    logoUrl: optimismLogoUrl,
    nativeCurrency: { name: 'Optimistic kovETH', symbol: 'kovOpETH', decimals: 18 },
    statusPage: 'https://optimism.io/status',
  }, */
  [SupportedChainId.XDAI]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://blockscout.com/xdai/mainnet/',
    infoLink: '',
    label: 'Gnosis Chain',
    rpcUrls: ['https://rpc.gnosischain.com/'],
    logoUrl: GnosisChainLogo, // mod
    nativeCurrency: { name: 'xDai', symbol: 'XDAI', decimals: 18 },
  },
  [SupportedChainId.BSCTEST]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://explorer.binance.org/',
    infoLink: '',
    label: 'Bsc Test',
    logoUrl: BscLogoUrl,
    nativeCurrency: { name: 'BSC Testnet', symbol: 'tBNB', decimals: 18 },
  },
}

export const ARBITRUM_HELP_CENTER_LINK = 'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum'
export const OPTIMISM_HELP_CENTER_LINK =
  'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ'

export const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  // [SupportedChainId.MAINNET]: 'Mainnet',
  [SupportedChainId.MAINNET]: 'Ethereum', // mod
  [SupportedChainId.RINKEBY]: 'Rinkeby',
  // [SupportedChainId.ROPSTEN]: 'Ropsten',
  // [SupportedChainId.GOERLI]: 'Görli',
  // [SupportedChainId.KOVAN]: 'Kovan',
  // [SupportedChainId.XDAI]: 'XDai',
  [SupportedChainId.XDAI]: 'Gnosis Chain', // mod
  [SupportedChainId.BSCTEST]: 'Bsc Test',
  //   [SupportedChainId.ARBITRUM_KOVAN]: 'kArbitrum',
  //   [SupportedChainId.ARBITRUM_ONE]: 'Arbitrum One',
}
