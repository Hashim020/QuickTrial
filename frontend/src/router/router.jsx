import React from 'react'
import App from '../App.jsx';
import { Route, Routes } from 'react-router-dom'


import LoginPage from "../pages/LoginPage.jsx"
import SignupPage from "../pages/RegistrationPage.jsx"
import SubscriptionPage from '../pages/SubscriptionPage.jsx';
import FreeTrialPage from '../pages/FreeTrialPage.jsx';
const Routes1 = () => {
    return (
        <Routes>
            <Route path='/' element={<App />}/>
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='subscription' element={<SubscriptionPage />} />
            <Route path='Trial' element={<FreeTrialPage />} />
        </Routes>
    )
}



export default Routes1