import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.scss'
import { App } from './App'
import { ROUTES } from './ROUTES'

const container = window.document.getElementById('root')
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: ROUTES.map((route) => {
      return {
        index: route.path === '/',
        path: route.path === '/' ? undefined : route.path,
        element: route.Component,
      }
    }),
  },
])

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </React.StrictMode>,
  )
}
