import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthProvider'
import axios from 'axios'
import Container from '@mui/material/Container'
import jwt from 'jwt-decode'
import DeckProvider from '../Deck/DeckProvider'
import {
  Paper,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material"

const User = () => {
  const [user, setUser] = useState(null)
  const { token } = useAuth()

  useEffect(() => {

    if (token) {
      const decoded = jwt(token)
      axios.get(`http://localhost:8000/users/${decoded.user}`, { headers: { authorization: `Bearer ${token}` } }).then((response) => {
        console.log(`response from users ${response.data.firstName} `, response.data)
        setUser(response.data)
 
      })
    }
  }, [token])

  return (
    <React.Fragment>
      {user === null ? <span>Loading...</span> :
        <Container >
          <span>First Name: {user.firstName}</span>
          <br />
          <span>User ID {user.id}</span>
          <br />
          <span>Decks: </span>
          {user.decks.map((deck, idx) => {
            return (
              <span
                key={idx}
              >
                <ListItemText primary={`${deck.name}`} />
              </span>
            )
          })}
      
        </Container>
      }
    </React.Fragment>
  )
}

export default User



