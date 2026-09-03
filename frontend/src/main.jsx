import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route , RouterProvider , Routes, createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import Homepage from './pages/Homepage.jsx'
import Destinations from './pages/Destinations.jsx'
import Planet from './pages/Planet.jsx'
import Checkout from './pages/Checkout.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import Auth from './pages/Auth.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import { AdminAuthProvider } from './contexts/AdminAuthContext.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path='destinations' element={<Destinations />}/>
        <Route path='destinations/:id' element={<Planet />} />
        <Route element={<ProtectedRoute />}>
          <Route path ='book/:id' element={<Checkout />}/>
          <Route path="dashboard" element={<UserDashboard />}/>
        </Route>
        <Route path='signin' element={<Auth option='Sign-In' />}/>
        <Route path='login' element={<Auth option='Login' />}/>
      </Route>
      <Route path='admin-login' element={<AdminLogin />}/>
      <Route path='/admin/' element={<AdminLayout/>}>
        <Route path='auth/context' element={<AdminAuthProvider />} />
        <Route element={<AdminRoute />}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='users' element={<AdminDashboard table='users/show'/>} />
          <Route path='planets' element={<AdminDashboard table='planets'/>} />
          <Route path='bookings' element={<AdminDashboard table='booking'/>} />
          <Route path='flights' element={<AdminDashboard />} />
          <Route path='marketing' element={<AdminDashboard />} />
        </Route>
      </Route>
    </Route>
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
)
