import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = () => {
        const isValidUser = username === '' && password === ''

        if (isValidUser) {
            setIsLoggedIn(true)
        } else {
            alert('Email o password sono errati!')
        }
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
    }
    // Funziona
    const handleLoginWithGithub = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`
    }

    if (isLoggedIn) {
        return (
            <div>
                <h1>Benvenuto/a, {username}!</h1>
                <Button onClick={handleLogout}>Logout</Button>

                <Button type="submit" onClick={handleLoginWithGithub}>
                    Login with GitHub
                </Button>
            </div>
        )
    }
}
export default Login
