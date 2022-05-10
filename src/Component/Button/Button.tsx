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

export const OutlinedButton = styled(Button)<ButtonProps>`
  &.MuiButton-root {
    color: #7c7e82;
    border-radius: 4px;
    border: 1px solid #c0c5ce;
  }
`

export const ViewDetailButton = styled(Button)<ButtonProps>`
  &.MuiButton-root {
    color: #ff9900;
    border-radius: 20px;
    background-color: #fff7e6;
    border: none;
    box-shadow: none;
    height: auto;
    &:hover {
      background: #fceece;
      border: none;
      box-shadow: none;
    }
  }
`

export const DeleteButton = styled(Button)<ButtonProps>`
  &.MuiButton-root {
    color: #b93e5c;
    border-radius: 20px;
    background-color: #fdf4f7;
    border: none;
    box-shadow: none;
    height: auto;
    &:hover {
      background: #f2dbe3;
      border: none;
      box-shadow: none;
    }
  }
`
