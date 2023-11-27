import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { getRoutes } from './Routes/Routes'
import { RouterProvider } from 'react-router-dom'
import AuthenticationContextProvider from './Contexts/AuthenticationContextProvider'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthenticationContextProvider>
        <RouterProvider router={getRoutes}></RouterProvider>
      </AuthenticationContextProvider>
    </QueryClientProvider>
    <ToastContainer></ToastContainer>
  </React.StrictMode>,
)
