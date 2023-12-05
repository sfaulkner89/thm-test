import { TextField } from '@mui/material'

export const InputElement = ({
  value,
  element,
  textArea = false,
  fullWidth = false,
  onChange
}: {
  value: string
  element: string
  textArea?: boolean
  fullWidth?: boolean
  onChange: (value: string, element: string) => void
}) => {
  return (
    <TextField
      id='basic'
      label={element}
      color='primary'
      fullWidth={fullWidth}
      variant='standard'
      value={value}
      multiline={textArea}
      onChange={e => onChange(e.target.value, element.toLowerCase())}
      autoComplete='off'
      sx={{
        borderRadius: '10px',
        marginBottom: '10px',
        width: fullWidth ? '100%' : '30%',
        height: textArea ? '100px' : '50px',
        border: 'none'
      }}
    />
  )
}
