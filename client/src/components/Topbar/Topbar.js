import React from "react"
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'

function Topbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const logoutUser = () => {
    logout(navigate("/"))
  }

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home-icon"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
          Notoriety
        </Typography>
        {!token &&
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>}
        {!token &&
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        }
        {token &&
          <Button color="inherit" component={Link} to="/create">
            Add Card
          </Button>
        }
        {token &&
          <Button color="inherit" onClick={logoutUser}>
            Logout
          </Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Topbar