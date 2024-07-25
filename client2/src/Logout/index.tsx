import axios from 'axios'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'

import { CookieType } from '../CONSTANTS'
import Rocket from '../Rocket.gif'

import './index.scss'

export function Logout(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [cookies, _setCookie, removeCookie] = useCookies(['token'])
  const token = (cookies as CookieType).token
  const isLoggedIn = token != null

  async function doLogout() {
    setLoading(true)
    try {
      const response = await axios.request({
        method: 'delete',
        url: '/api/sessions',
        withCredentials: true,
      })
      removeCookie('token')
    } catch (error) {
      // TODO error handling w/in client
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    void doLogout()
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }
  if (loading) {
    return (
      <div className="Graph Loading">
        <div className="Loading">
          <img src={Rocket} />
        </div>
      </div>
    )
  }
  return (
    <div className="Logout">
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  )
}
