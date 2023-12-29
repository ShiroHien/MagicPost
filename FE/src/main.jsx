import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import { RootRoutes } from './routes/RootRoutes'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router ={RootRoutes} />
    {/* <Router /> */}
  </React.StrictMode>
)
