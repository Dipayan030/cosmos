import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route , RouterProvider , createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Homepage from './components/Homepage.jsx'
import Destinations from './components/Destinations.jsx'
import Planet from './components/Planet.jsx'
import Checkout from './components/Checkout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Homepage />} />
      <Route path='destinations' element={<Destinations />}/>
      <Route path='destinations/:id' element={<Planet />} />
      <Route path='book' element={<Checkout />} />
      <Route path ='book/:id' element={<Checkout />}/>
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
