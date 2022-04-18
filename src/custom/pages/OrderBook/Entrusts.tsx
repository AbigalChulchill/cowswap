import styled from 'styled-components/macro'
import { Text } from 'rebass'
import { CurrencyAmount } from '@uniswap/sdk-core'
import Tabs, { Tab, TabList, TabPanel, TabPanels } from '@src/custom/components/Tabs'
import { Trans } from '@lingui/macro'
import useRecentActivity, {
  ActivityDescriptors,
  TransactionAndOrder,
  useMultipleActivityDescriptors,
} from 'hooks/useRecentActivity'

import { supportedChainId } from 'utils/supportedChainId'
import { useMemo } from 'react'
import { OrderStatus } from '@src/custom/state/orders/actions'
import { useActiveWeb3React } from '@src/hooks/web3'
import { useWalletInfo } from '@src/custom/hooks/useWalletInfo'
import { ActivityDerivedState, getActivityDerivedState } from '@src/custom/components/AccountDetails/Transaction'
import { useToken } from '@src/hooks/Tokens'
import { DEFAULT_PRECISION, V_COW_CONTRACT_ADDRESS } from '@src/custom/constants'
import { formatSmart } from '@src/custom/utils/format'
import { getExecutionPrice, getLimitPrice } from '@src/custom/state/orders/utils'

const EntrustsWrapper = styled.div`
  margin-top: 5px;
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

const isPending = (data: TransactionAndOrder) =>
  data.status === OrderStatus.PENDING || data.status === OrderStatus.PRESIGNATURE_PENDING

const isConfirmed = (data: TransactionAndOrder) =>
  data.status === OrderStatus.FULFILLED || data.status === OrderStatus.EXPIRED || data.status === OrderStatus.CANCELLED

export default function Entrusts() {
  const { chainId: connectedChainId } = useActiveWeb3React()
  const chainId = supportedChainId(connectedChainId)

  const allRecentActivity = useRecentActivity()

  const { pendingActivity, confirmedActivity } = useMemo(() => {
    // Separate the array into 2: PENDING and FULFILLED(or CONFIRMED)+EXPIRED
    const pendingActivity = allRecentActivity.filter(isPending).map((data) => data.id)
    const confirmedActivity = allRecentActivity.filter(isConfirmed).map((data) => data.id)

    return {
      pendingActivity,
      confirmedActivity,
    }
  }, [allRecentActivity])

  const activities = useMultipleActivityDescriptors({ chainId, ids: pendingActivity.concat(confirmedActivity) }) || []
  return (
    <EntrustsWrapper>
      <Tabs defaultIndex={1}>
        <TabList justify={'start'}>
          <Tab>
            <Text fontSize={14} padding={'12px 0 10px'}>
              <Trans>当前委托(0) </Trans>
            </Text>
          </Tab>
          <Tab>
            <Text fontSize={14} padding={'12px 0 10px'}>
              <Trans>历史委托 </Trans>
            </Text>
          </Tab>
          <Tab>
            <Text fontSize={14} padding={'12px 0 10px'}>
              <Trans>仓位(0) </Trans>
            </Text>
          </Tab>
          <Tab>
            <Text fontSize={14} padding={'12px 0 10px'}>
              <Trans>历史成交</Trans>
            </Text>
          </Tab>
        </TabList>
        <TabPanels style={{ padding: '0' }}>
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
              <tbody> {activities && renderActivities(activities)}</tbody>
            </TableWrapper>
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </EntrustsWrapper>
  )
}

function renderActivities(activities: ActivityDescriptors[]) {
  return activities.map((activity) => <Activity key={activity.id} activity={activity} />)
}

function Activity({ activity: activityData }: { activity: ActivityDescriptors }) {
  const { chainId } = useActiveWeb3React()
  const { allowsOffchainSigning, gnosisSafeInfo } = useWalletInfo()

  // Get some derived information about the activity. It helps to simplify the rendering of the sub-components
  const activityDerivedState = useMemo(
    () => getActivityDerivedState({ chainId, activityData, allowsOffchainSigning, gnosisSafeInfo }),
    [chainId, activityData, allowsOffchainSigning, gnosisSafeInfo]
  )

  if (!activityDerivedState || !chainId) return null
  const { activityLinkUrl } = activityDerivedState
  const hasLink = activityLinkUrl !== null

  const creationTimeEnhanced = activityDerivedState?.enhancedTransaction?.addedTime
  const creationTimeOrder = activityDerivedState?.order?.creationTime
  const creationTimeFull = creationTimeEnhanced
    ? new Date(creationTimeEnhanced)
    : creationTimeOrder
    ? new Date(Date.parse(creationTimeOrder))
    : undefined

  const timeFormatOptionHM: Intl.DateTimeFormatOptions = {
    timeStyle: 'short',
  }

  // Hour:Minute
  const creationTime = creationTimeFull?.toLocaleString(undefined, timeFormatOptionHM)

  return (
    <ActivityDetails
      chainId={chainId}
      activityDerivedState={activityDerivedState}
      activityLinkUrl={activityLinkUrl ?? undefined}
      disableMouseActions={!hasLink}
      creationTime={creationTime && creationTime}
    />
  )
}

interface OrderSummaryType {
  from: string | undefined
  to: string | undefined
  limitPrice: string | undefined
  executionPrice?: string | undefined
  validTo: string | undefined
  fulfillmentTime?: string | undefined
  kind?: string
}

const DEFAULT_ORDER_SUMMARY = {
  from: '',
  to: '',
  limitPrice: '',
  validTo: '',
}

function ActivityDetails(props: {
  chainId: number
  activityDerivedState: ActivityDerivedState
  activityLinkUrl: string | undefined
  disableMouseActions: boolean | undefined
  creationTime?: string | undefined
}) {
  const { activityDerivedState, chainId, activityLinkUrl, disableMouseActions, creationTime } = props
  const { id, isOrder, summary, order, enhancedTransaction, isCancelled, isExpired, isUnfillable } =
    activityDerivedState
  const tokenAddress =
    enhancedTransaction?.approval?.tokenAddress || (enhancedTransaction?.claim && V_COW_CONTRACT_ADDRESS[chainId])
  const singleToken = useToken(tokenAddress) || null

  if (!order && !enhancedTransaction) return null

  // Order Summary default object
  let orderSummary: OrderSummaryType
  if (order) {
    const { inputToken, sellAmount, feeAmount, outputToken, buyAmount, validTo, kind, fulfillmentTime } = order

    const sellAmt = CurrencyAmount.fromRawAmount(inputToken, sellAmount.toString())
    const feeAmt = CurrencyAmount.fromRawAmount(inputToken, feeAmount.toString())
    const outputAmount = CurrencyAmount.fromRawAmount(outputToken, buyAmount.toString())
    const sellTokenDecimals = order?.inputToken?.decimals ?? DEFAULT_PRECISION
    const buyTokenDecimals = order?.outputToken?.decimals ?? DEFAULT_PRECISION

    const limitPrice = formatSmart(
      getLimitPrice({
        buyAmount: order.buyAmount.toString(),
        sellAmount: order.sellAmount.toString(),
        buyTokenDecimals,
        sellTokenDecimals,
        inverted: true, // TODO: handle invert price
      })
    )

    let executionPrice: string | undefined
    if (order.apiAdditionalInfo && order.status === OrderStatus.FULFILLED) {
      const { executedSellAmountBeforeFees, executedBuyAmount } = order.apiAdditionalInfo
      executionPrice = formatSmart(
        getExecutionPrice({
          executedSellAmountBeforeFees,
          executedBuyAmount,
          buyTokenDecimals,
          sellTokenDecimals,
          inverted: true, // TODO: Handle invert price
        })
      )
    }

    const getPriceFormat = (price: string): string => {
      return `${price} ${sellAmt.currency.symbol} per ${outputAmount.currency.symbol}`
    }

    const DateFormatOptions: Intl.DateTimeFormatOptions = {
      dateStyle: 'medium',
      timeStyle: 'short',
    }

    orderSummary = {
      ...DEFAULT_ORDER_SUMMARY,
      from: `${formatSmart(sellAmt.add(feeAmt))} ${sellAmt.currency.symbol}`,
      to: `${formatSmart(outputAmount)} ${outputAmount.currency.symbol}`,
      limitPrice: limitPrice && getPriceFormat(limitPrice),
      executionPrice: executionPrice && getPriceFormat(executionPrice),
      validTo: validTo ? new Date((validTo as number) * 1000).toLocaleString(undefined, DateFormatOptions) : undefined,
      fulfillmentTime: fulfillmentTime
        ? new Date(fulfillmentTime).toLocaleString(undefined, DateFormatOptions)
        : undefined,
      kind: kind.toString(),
    }
  } else {
    orderSummary = DEFAULT_ORDER_SUMMARY
  }

  const { kind, from, to, executionPrice, limitPrice, fulfillmentTime, validTo } = orderSummary
  const activityName = isOrder ? `${kind} order` : 'Transaction'
  const inputToken = activityDerivedState?.order?.inputToken || null
  const outputToken = activityDerivedState?.order?.outputToken || null

  return (
    <tr>
      <td align={'left'}>{from}</td>
      <td align={'left'}>{to}</td>
      <td align={'left'}>{limitPrice}</td>
    </tr>
  )
}
