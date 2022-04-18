import styled from 'styled-components/macro'
import { Info } from 'react-feather'
import AppBody from 'pages/AppBody'
import Column, { AutoColumn } from '@src/components/Column'

export const StyledInfo = styled(Info)`
  opacity: 0.4;
  color: ${({ theme }) => theme.text1};
  height: 16px;
  width: 16px;
  :hover {
    opacity: 0.8;
  }
`

export const OrderBookWrapper = styled(Column)`
  background: ${({ theme }) => theme.bg2};
`

export const StyledAppBody = styled(AppBody)`
  max-width: unset;
  padding: 10px 0px;
  border: unset;
  background: ${({ theme }) => theme.bg9};
`

export const TransactionContent = styled.div`
  display: grid;
  grid-template-columns: 22% 1fr 316px;
  grid-gap: 5px;
  margin-top: 5px;
`
export const TradingViewWrapper = styled.div`
  height: 467px;
`
export const OrderWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.bg9};
`

export const MarkerOrderWrapper = styled(AutoColumn)`
  background: ${({ theme }) => theme.bg9};
`
