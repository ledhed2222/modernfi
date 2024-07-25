import axios from 'axios'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'

import { CookieType } from '../CONSTANTS'
import Rocket from '../Rocket.gif'

export function Login(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cookies, setCookie] = useCookies(['token'])
  const token = (cookies as CookieType).token
  const isLoggedIn = token != null

  async function doOnSubmit() {
    let response
    setLoading(true)
    try {
      response = await axios.request({
        method: 'post',
        url: '/api/sessions',
        data: {
          name: username,
          password,
        },
      })
    } catch (error) {
      // TODO error handling w/in client
    } finally {
      setLoading(false)
    }
    if (response) {
      setCookie('token', response.data.token, {
        sameSite: 'strict',
        secure: true,
        // 3 hours
        maxAge: 10800,
        path: '/',
      })
    }
  }

  function onSubmit() {
    void doOnSubmit()
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }
  if (loading) {
    return (
      <div className="Login">
        <div className="Loading">
          <img src={Rocket} />
        </div>
      </div>
    )
  }
  return (
    <div className="Login">
      <form onSubmit={onSubmit}>
        <div>
          Username&nbsp;
          <input
            type="text"
            name="username"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
            required
          />
        </div>
        <div>
          Password&nbsp;
          <input
            type="password"
            name="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            required
          />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}
