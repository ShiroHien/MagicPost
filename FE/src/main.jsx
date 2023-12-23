import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Router from './routes'
import { LandingRoutes } from './routes/LandingRoutes'
import { BrowserRouter, RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router ={LandingRoutes} />
    {/* <Router /> */}
  </React.StrictMode>
)
