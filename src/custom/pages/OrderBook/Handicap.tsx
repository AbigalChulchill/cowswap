import styled from 'styled-components/macro'
import { Text } from 'rebass'
import { RowFixed } from '@src/components/Row'
import { Currency } from '@uniswap/sdk-core'
import { useGpBuyAndSellOrders } from '@src/custom/api/gnosisProtocol/hooks'
import { formatEther, parseEther } from '@ethersproject/units'
import { BigNumber } from '@ethersproject/bignumber'
import { formatNumber } from '@src/custom/utils'

interface HandicapProps {
  sellToken: Currency | undefined
  buyToken: Currency | undefined
}

const HandicapWrapper = styled.div`
  background: ${({ theme }) => theme.bg9};
`
const TableWrapper = styled.table`
  width: 100%;
  padding: 0 15px;
  thead {
    border-radius: 3px;
    tr {
      th {
        padding: 16px 0;
        border-bottom: 0;
        color: ${({ theme }) => theme.text3};
        font-size: 12px;
      }
    }
  }
  tbody {
    tr {
      & > :not(:first-child) {
        margin: 10px 0;
      }
      td {
        font-size: 12px;
      }
    }
  }
`
export default function Handicap({ sellToken, buyToken }: HandicapProps) {
  const buyList = useGpBuyAndSellOrders(sellToken?.wrapped?.address, buyToken?.wrapped?.address)
  const sellList = useGpBuyAndSellOrders(buyToken?.wrapped?.address, sellToken?.wrapped?.address)

  return (
    <HandicapWrapper>
      <TableWrapper>
        <thead>
          <tr>
            <th>
              <Text fontSize={12}>Pcice({sellToken?.symbol})</Text>
            </th>
            <th>
              <Text fontSize={12}>Amout({buyToken?.symbol})</Text>
            </th>
            <th>
              <Text fontSize={12}>Turnover</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {sellList &&
            sellList.map((item) => (
              <tr key={item.uid}>
                <td align={'left'}>{formatNumber(formatEther(BigNumber.from(item.sellAmount).div(item.buyAmount)))}</td>
                <td align={'right'}>{formatNumber(formatEther(BigNumber.from(item.sellAmount)))}</td>
                <td align={'right'}>{formatNumber(formatEther(BigNumber.from(item.buyAmount)))}</td>
              </tr>
            ))}

          <RowFixed gap="4px" padding={'10px 0'}>
            <Text fontSize={20} lineHeight={'23px'} marginRight={'4px'}>
              442.9
            </Text>
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.03366 0L0 4.59104L1.00884 5.73929L3.32772 3.099V13.6582H4.73959V3.099L7.05933 5.73929L8.06731 4.59104L4.03366 0Z"
                fill="#1ED392"
              />
            </svg>
            <Text fontSize={14} marginLeft={'5px'}>
              $442.90
            </Text>
          </RowFixed>

          {buyList &&
            buyList.map((item) => (
              <tr key={item.uid}>
                <td align={'left'}>{formatNumber(formatEther(BigNumber.from(item.buyAmount).div(item.sellAmount)))}</td>
                <td align={'right'}>{formatNumber(formatEther(BigNumber.from(item.buyAmount)))}</td>
                <td align={'right'}>{formatNumber(formatEther(BigNumber.from(item.sellAmount)))}</td>
              </tr>
            ))}
          {/* {[...new Array(8).keys()].map((item) => (
            <tr key={item}>
              <td align={'left'}>3</td>
              <td align={'right'}>2</td>
              <td align={'right'}>1</td>
            </tr>
          ))} */}

          {/* {orderData &&
            orderData.map((item, index) => {
              return (
                <tr key={item.uid}>
                  <td align={'center'}>{item.buyAmount}</td>
                  <td align={'center'}>{item.sellAmount}</td>
                  <td align={'center'}>{item.validTo}</td>
                </tr>
              )
            })} */}
        </tbody>
      </TableWrapper>
    </HandicapWrapper>
  )
}
