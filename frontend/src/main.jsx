import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route , RouterProvider , Routes, createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Homepage from './components/Homepage.jsx'
import Destinations from './components/Destinations.jsx'
import Planet from './components/Planet.jsx'
import Checkout from './components/Checkout.jsx'
import UserDashboard from './components/UserDashboard.jsx'
import Auth from './components/Auth.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AuthProvider from './components/AuthContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Homepage />} />
      <Route path='destinations' element={<Destinations />}/>
      <Route path='destinations/:id' element={<Planet />} />
      <Route element={<ProtectedRoute />}>
        <Route path ='book/:id' element={<Checkout />}/>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<UserDashboard />}/>
      </Route>
      <Route path='signin' element={<Auth option='Sign-In' />}/>
      <Route path='login' element={<Auth option='Login' />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
)
