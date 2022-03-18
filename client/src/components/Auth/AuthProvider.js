import React, { useState } from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'

const AuthContext = React.createContext(null)

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    

    const login = async (email, password, callback) => { 
        console.log("[Login]")
        try{
            const authResponse = await axios.post(
                'http://localhost:8000/auth/login', 
                { email: email, password: password }, 
                { 'content-type': 'application/json' }
            )
            console.log(authResponse)
            const decoded = jwt(authResponse.data.token)
            localStorage.setItem('token', authResponse.data.token)
            setToken(authResponse.data.token)
            setAuth({ token: authResponse.data.token, user: decoded.user })
            callback()
        } catch (err) {
            console.log(`Login error ${err}`)
            alert('Invalid email or password information')
        }
    }

    const register = async (firstName, lastName, email, password, callback) => {  
        try{
            const registerResponse = await axios.post(
                'http://localhost:8000/auth/register', 
                { firstName: firstName, lastName: lastName, email: email, password: password }, 
                { 'content-type': 'application/json' }
            )
            console.log(registerResponse)
            callback()
        } catch (err) {
            console.log(`Login error ${err}`)
            alert('Invalid Information')
        }
    }

    const logout = async () => { 
        console.log("[Logout]")
        try{
            setAuth(null)
            setToken(null)
            localStorage.removeItem('token')
        } catch (err) {
            console.log(`Login error ${err}`)
            alert('Invalid email or password information')
        }
    }


    const authCtx = {
        auth: auth,
        token: token,
        login: login,
        register: register,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={authCtx}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const authContext = React.useContext(AuthContext)
    return authContext
}

export default AuthProvider
