import React from 'react'
import App from '../App.jsx';
import { Route, Routes } from 'react-router-dom'


import LoginPage from "../pages/LoginPage.jsx"
import SignupPage from "../pages/RegistrationPage.jsx"

const Routes1 = () => {
    return (
        <Routes>
            <Route path='/' element={<App />}/>
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignupPage />} />
        </Routes>
    )
}



export default Routes1