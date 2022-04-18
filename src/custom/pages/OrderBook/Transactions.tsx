import styled from 'styled-components/macro'
import { Text } from 'rebass'
import Tabs, { Tab, TabList, TabPanel, TabPanels } from '@src/custom/components/Tabs'
import { Trans } from '@lingui/macro'
import { hasTrades } from '@src/custom/utils/trade'
import { useActiveWeb3React } from '@src/hooks/web3'
import { getTrades } from '@src/custom/api/gnosisProtocol'
import { useCallback, useEffect } from 'react'
import { useReferralAddress } from '@src/custom/state/affiliate/hooks'

const TransactionsWrapper = styled.div`
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
export default function Transactions() {
  const { account, chainId } = useActiveWeb3React()
  const referralAddress = useReferralAddress()
  // const [error, setError] = useState('')

  // const handleAffiliateState = useCallback(async () => {
  //   if (!chainId || !account || !referralAddress) {
  //     return
  //   }

  //   if (!referralAddress.isValid) {
  //     setError('Affiliate program: The referral address is invalid.')
  //     return
  //   }

  //   if (fulfilledOrders.length >= 1 && isFirstTrade.current) {
  //     setAffiliateState(null)
  //     isFirstTrade.current = false
  //     history.replace({ search: '' })
  //     resetReferralAddress()
  //     return
  //   }

  //   try {
  //     // we first validate that the user hasn't already traded
  //     const userHasTrades = await retry(() => hasTrades(chainId, account), DEFAULT_RETRY_OPTIONS).promise
  //     if (userHasTrades) {
  //       return
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     setError('Affiliate program: There was an error loading trades. Please try again later.')
  //     return
  //   }

  //   setAffiliateState('ACTIVE')
  //   isFirstTrade.current = true
  // }, [referralAddress, chainId, account, fulfilledOrders.length, history, resetReferralAddress])

  // useEffect(() => {
  //   handleAffiliateState()
  // }, [])

  return (
    <TransactionsWrapper>
      <Tabs defaultIndex={1}>
        <TabList justify={'flex-start'}>
          <Tab>
            <Text fontSize={14} padding={'12px 0 10px'}>
              <Trans>recent transactions</Trans>
            </Text>
          </Tab>
          <Tab>
            <Text fontSize={14} padding={'12px 0 10px'}>
              <Trans>My transaction</Trans>
            </Text>
          </Tab>
        </TabList>
        <TabPanels style={{ padding: '0' }}>
          <TabPanel></TabPanel>
          <TabPanel>
            <TableWrapper>
              <thead>
                <tr>
                  <th>
                    <Text fontSize={12}>From</Text>
                  </th>
                  <th>
                    <Text fontSize={12}>To</Text>
                  </th>
                  <th>
                    <Text fontSize={12}>Price</Text>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td align={'left'}>1</td>
                  <td align={'left'}>2</td>
                  <td align={'left'}>3</td>
                </tr>
              </tbody>
            </TableWrapper>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </TransactionsWrapper>
  )
}
