import { Trans } from '@lingui/macro'
import { Percent } from '@uniswap/sdk-core'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import SettingsTab from 'components/Settings'
import { darken } from 'polished'

import { RowBetween, RowFixed } from '../Row'

const StyledSwapHeader = styled.div`
  padding: 1rem 1.25rem 0.5rem 1.25rem;
  width: 100%;
`
const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
  & > :first-child {
    margin-right: 8px;
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 16px;
  font-weight: 500;

  &.${activeClassName} {
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

export default function SwapHeader({
  allowedSlippage,
  active,
}: {
  allowedSlippage: Percent
  active: 'swap' | 'limit'
}) {
  return (
    <StyledSwapHeader>
      <RowBetween>
        <RowFixed>
          <Tabs>
            <StyledNavLink id={`swap-nav-link`} to={'/swap'} isActive={() => active === 'swap'}>
              <Trans>Swap</Trans>
            </StyledNavLink>
            <StyledNavLink id={`limit-nav-link`} to={'/limit'} isActive={() => active === 'limit'}>
              <Trans>Limit</Trans>
            </StyledNavLink>
          </Tabs>
        </RowFixed>
        <RowFixed>
          <SettingsTab placeholderSlippage={allowedSlippage} />
        </RowFixed>
      </RowBetween>
    </StyledSwapHeader>
  )
}
