import { Component, ReactNode } from 'react'
import styled from 'styled-components/macro'
import {
  Tabs as TabsComponents,
  TabList as TabListComponent,
  Tab as TabComponent,
  TabPanels as TabPanelsComponent,
  TabPanel as TabPanelComponent,
} from '@reach/tabs'
import '@reach/tabs/styles.css'

const StyledTabsOverlay = styled(TabsComponents)`
  width: 100%;
  &[data-reach-tabs] {
    background: transparent;
  }
`
export const TabList = styled(TabListComponent)<{
  justify?: 'stretch' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'space-between'
}>`
  &[data-reach-tab-list] {
    display: flex;
    background: transparent;
    border-bottom: 1px solid ${({ theme }) => theme.bg3};
    justify-content: ${({ justify }) => justify ?? 'flex-start'};
  }
  &[data-reach-tab-list][aria-orientation='vertical'] {
    flex-direction: column;
  }
`
export const Tab = styled(TabComponent)`
  &[data-reach-tab] {
    display: inline-block;
    border: none;
    padding: 0.35em 1em;
    margin: 0;
    border-bottom: 1px solid transparent;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    color: ${({ theme }) => theme.text3};
    &[data-selected] {
      color: ${({ theme }) => theme.text1};
      border-bottom-color: ${({ theme }) => theme.primary1};
      border-bottom-width: 2px;
    }
  }
`

export const TabPanels = styled(TabPanelsComponent)`
  padding: 25px 0 0;
`
export const TabPanel = styled(TabPanelComponent)``

interface TabsProps {
  as?: string | Component
  defaultIndex?: number
  children: ReactNode | ((props: { focusedIndex: number; id: string; selectedIndex: number }) => ReactNode)
  index?: number
  keyboardActivation?: 'auto' | 'manual'
  onChange?: (i: any) => void
  orientation?: 'horizontal' | 'vertical'
}

export default function Tabs({
  //   as,
  //   defaultIndex,
  index,
  //   keyboardActivation,
  onChange,
  //   orientation,
  children,
}: TabsProps) {
  return (
    <StyledTabsOverlay onChange={onChange} index={index}>
      {children}
    </StyledTabsOverlay>
  )
}
