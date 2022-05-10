import styled from 'styled-components'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'

interface InputWithLabelProps extends OutlinedInputProps {
  width?: number
  label: string
}
const CustomOutlineInput = styled(OutlinedInput)<InputWithLabelProps>`
  &.MuiOutlinedInput-root {
    height: 45px;
    border-radius: 4;
    background-color: #fff;
    border: 1px solid #8d9196;
    &.Mui-focused {
      border: 1px solid #0f6fde;
    }
  }
  input {
    width: ${(props) => `${props.width}px`};
  }
  fieldset {
    border: 0;
  }
`
export const InputWithLabel = (props: InputWithLabelProps) => {
  return (
    <div>
      <Typography variant='body1' display='block' component='div'>
        {props.label}
      </Typography>
      <CustomOutlineInput {...props} />
    </div>
  )
}
