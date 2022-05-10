import BaseButton, {
  ButtonProps as BaseButtonProps,
} from '@mui/material/Button'
import styled from 'styled-components'

interface ButtonProps extends BaseButtonProps {
  label?: string
  width?: number
}

const OverrideButton = styled(BaseButton)<ButtonProps>`
  &.MuiButton-root {
    height: 45px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    width: ${(props) => `${props.width}px`};
  }
`

export const Button = (props: ButtonProps) => {
  return (
    <>
      <OverrideButton {...props}>{props.label}</OverrideButton>
    </>
  )
}

export const SuccessButton = styled(Button)<ButtonProps>`
  &.MuiButton-root {
    color: #ffffff;
    background: #22bb66;
    border-radius: 4px;
    &:hover {
      background: #108a47;
    }
  }
`
export const ConnectButton = styled(Button)<ButtonProps>`
  &.MuiButton-root {
    color: #ffffff;
    background: #3c64b1;
    border-radius: 4px;
    &:hover {
      background: #1a4087;
    }
  }
`
