import styled from 'styled-components/macro'
import { Info } from 'react-feather'
import AppBody from 'pages/AppBody'

export const StyledInfo = styled(Info)`
  opacity: 0.4;
  color: ${({ theme }) => theme.text1};
  height: 16px;
  width: 16px;
  :hover {
    opacity: 0.8;
  }
`

export const StyledAppBody = styled(AppBody)`
  border: ${({ theme }) => theme.appBody.border};
  box-shadow: ${({ theme }) => theme.appBody.boxShadow};
  background: ${({ theme }) => theme.bg1};
`

export const Input = styled.input<{ error?: boolean }>`
  font-size: 1.2rem;
  outline: none;
  border: 2px solid ${({ theme }) => theme.blueShade2};
  border-radius: 20px;
  flex: 1 1 auto;
  width: 0;
  max-width: 150px;
  background-color: ${({ theme }) => theme.blueShade};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
  padding: 1rem 1rem 0.75rem 1rem;

  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`
