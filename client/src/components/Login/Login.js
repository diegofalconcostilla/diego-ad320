import React from 'react'
import { Button, Box, TextField, Typography } from '@mui/material'
import { useAuth } from '../Auth/AuthProvider'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'

const Login = () => {
  const { token, login } = useAuth()
  const navigate = useNavigate()
  let location = useLocation()

  const source = location.state?.from?.pathname || "/user"

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    login(data.get('email'), data.get('password'), () => {
      navigate(source, { replace: true })
    })
  }

  if (token ) {
    return <Navigate to={source} />
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  )
}

export default Login
