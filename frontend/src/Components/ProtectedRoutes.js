import React from 'react'
import { Navigate } from 'react-router-dom'


function Protected_routes({ children, isProtected }) {
    const token = localStorage.getItem("access_token")
    if (isProtected) {
        if (!token) {
            return <Navigate to='/login' replace />
        }
    }
    else {
        if (token) {
            return <Navigate to='/' replace />
        }
    }
    return children;
}

export default Protected_routes