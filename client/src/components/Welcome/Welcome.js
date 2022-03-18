
import React from "react"
import { Container, Stack, Button, Typography } from "@mui/material"
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'

const Welcome = () => {
    const { token, } = useAuth()
    const navigate = useNavigate()
    let location = useLocation()

    const source = location.state?.from?.pathname || "/user"

    if (token) {
        return <Navigate to={source} />
    }

    return (
        <Container maxWidth="md">
            <Stack sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Welcome to our app!</Typography>
                <Button component={Link} to="/login">Log in</Button>
                <Button component={Link} to="/register">Register</Button>
            </Stack>
        </Container>
    )
}

export default Welcome