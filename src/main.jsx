import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { getRoutes } from './Routes/Routes'
import { RouterProvider } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={getRoutes}></RouterProvider>
  </React.StrictMode>,
)
