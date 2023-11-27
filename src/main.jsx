import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { getRoutes } from './Routes/Routes'
import { RouterProvider } from 'react-router-dom'
import AuthenticationContextProvider from './Contexts/AuthenticationContextProvider'
import { ToastContainer } from 'react-toastify'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <RouterProvider router={getRoutes}></RouterProvider>
    </AuthenticationContextProvider>
    <ToastContainer></ToastContainer>
  </React.StrictMode>,
)
