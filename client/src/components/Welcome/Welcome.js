import React from "react"
import { Container, Stack, Typography } from "@mui/material"
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'

const Welcome = () => {
    const { token, } = useAuth()
    let location = useLocation()

    const source = location.state?.from?.pathname || "/user"

    if (token) {
        return <Navigate to={source} />
    }

    return (
        <Container maxWidth="md">
            <Stack sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Welcome to our app!</Typography>
                <Typography>Check our log in at the up right corner</Typography>
                <Typography>Or register if it's your first time around</Typography>
            </Stack>
        </Container>
    )
}

export default Welcome
