import { Token } from '@uniswap/sdk-core'
import { SupportedChainId as ChainId } from 'constants/chains'

export const DAI_BSCTEST = new Token(ChainId.BSCTEST, '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea', 18, 'DAI', 'DAI')

export const BSCTEST_SYMBOL = 'TBNB'
export const BSCTEST_NAME = 'tBnb'

export const USDT_BSCTEST = new Token(
  ChainId.BSCTEST,
  '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
  18,
  'USDT',
  'Tether USD'
)
export const USDC_BSCTEST = new Token(
  ChainId.BSCTEST,
  '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
  18,
  'USDC',
  'USD Coin'
)

export const WBTC_BSCTEST = new Token(
  ChainId.BSCTEST,
  '0x577D296678535e4903D59A4C929B718e1D575e0A',
  18,
  'WBTC',
  'Wrapped BTC'
)

export const WETH_BSC = new Token(
  ChainId.BSCTEST,
  '0xae13d989dac2f0debff460ac112a837c89baa7cd',
  18,
  'WBNB',
  'Wrapped BNB'
)
