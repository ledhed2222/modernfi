import axios from 'axios'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, redirect } from 'react-router-dom'

import { CookieType } from '../CONSTANTS'

export function Signup(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConf, setPasswordConf] = useState<string>('')
  const [cookies] = useCookies(['token'])
  const token = (cookies as CookieType).token
  const isLoggedIn = token != null

  async function doOnSubmit() {
    if (password !== passwordConf) {
      // TODO errors
      return
    }
    let response
    setLoading(true)
    try {
      response = await axios.request({
        method: 'post',
        url: '/api/users',
        data: {
          user: {
            password,
            name: username,
          },
        },
      })
    } catch (error) {
      // TODO error handling w/in client
    } finally {
      setLoading(false)
    }
    if (response) {
      redirect('/login')
    }
  }

  function onSubmit() {
    void doOnSubmit()
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }
  if (loading) {
    // TODO
    return <div />
  }
  return (
    <div className="Signup">
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
          Repeat Password&nbsp;
          <input
            type="password"
            name="password_confirmation"
            value={passwordConf}
            onChange={(evt) => setPasswordConf(evt.target.value)}
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
