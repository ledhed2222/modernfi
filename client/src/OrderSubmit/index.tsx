import axios from 'axios'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, redirect } from 'react-router-dom'

import { TERMS, CookieType } from '../CONSTANTS'

import './index.scss'

export function OrderSubmit(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [term, setTerm] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [cookies] = useCookies(['token'])
  const token = (cookies as CookieType).token
  const isLoggedIn = token != null

  async function doOnSubmit() {
    let response
    if (!Object.values(TERMS).includes(parseInt(term, 10))) {
      // TODO error handling
      return
    }
    if (parseInt(amount, 10) <= 0) {
      // TODO error handling
      return
    }
    setLoading(true)
    try {
      response = await axios.request({
        method: 'post',
        url: '/api/treasury_orders',
        withCredentials: true,
        data: {
          treasury_order: {
            term,
            amount,
          },
        },
      })
    } catch (error) {
      // TODO error handling
    } finally {
      setLoading(false)
    }
  }

  function onSubmit() {
    void doOnSubmit()
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }
  if (loading) {
    // TODO
    return <div />
  }
  return (
    <div className="OrderSubmit">
      <form onSubmit={onSubmit}>
        <div>
          Term&nbsp;
          <select
            name="term"
            onChange={(evt) => setTerm(evt.target.value)}
            required
          >
            <option value={-1}>-</option>
            {Object.entries(TERMS).map(([label, value]) => {
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          Amount&nbsp;
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(evt) => setAmount(evt.target.value)}
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
