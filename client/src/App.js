import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import DeckProvider from './components/Deck/DeckProvider'
import { useAuth } from './components/Auth/AuthProvider'
import axios from 'axios'
import jwt from 'jwt-decode'

function App() {
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
      <Container width="lg">
        {user === null ? <span>Loading...</span> :
          <DeckProvider userId={user._id} decks={user.decks} />}
      </Container>
    </React.Fragment>
  )
}

export default App;
