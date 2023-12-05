import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { InputElement } from './InputElement'
import taskFetch from '../taskFetch'

type Props = {
  loggedIn: boolean
  setLoggedIn: (loggedIn: boolean) => void
  setToken: (token: string) => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'white',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
  p: 4
}

export default function SignInModal ({ loggedIn, setLoggedIn }: Props) {
  const [auth, setAuth] = useState<{ username: string; password: string }>({
    username: '',
    password: ''
  })
  const handleChange = (value: string, name: string) => {
    setAuth({ ...auth, [name]: value })
  }
  const handleSubmit = async () => {
    const res = await taskFetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ auth })
    })
    console.log(res.status)
    if (res.status === 200) {
      const { token } = await res.json()
      sessionStorage.setItem('token', token)
      setLoggedIn(true)
    }
  }
  return (
    <Modal
      open={!loggedIn}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <InputElement
          value={auth.username}
          element='Username'
          onChange={handleChange}
          fullWidth
        />
        <InputElement
          value={auth.password}
          element='Password'
          onChange={handleChange}
          fullWidth
        />
        <Button variant='contained' onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  )
}
