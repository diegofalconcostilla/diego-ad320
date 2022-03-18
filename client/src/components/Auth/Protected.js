import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider'

const Protected = (props) => {
    
    let { auth, token } = useAuth()
    let location = useLocation()
    const { children } = props

    if (token){
        return children
    }

    if (!auth || !auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children

    
}

export default Protected
