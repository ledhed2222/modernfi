import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'

import { TERMS, termLabel, CookieType } from '../CONSTANTS'
import Rocket from '../Rocket.gif'

interface Order {
  term: number
  amount: number
  created_at: string
}

function Order({ term, amount, created_at }: Order): JSX.Element {
  return (
    <tr className="Order">
      <td>{termLabel(term)}</td>
      <td>{amount}</td>
      <td>{new Date(created_at).toLocaleString()}</td>
    </tr>
  )
}

export function OrderView(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [cookies, setCookie] = useCookies(['token'])
  const token = (cookies as CookieType).token
  const isLoggedIn = token != null

  async function doGetOrders() {
    let response
    setLoading(true)
    try {
      setOrders(
        (
          await axios.request({
            method: 'get',
            url: '/api/users/orders',
            withCredentials: true,
          })
        ).data.orders,
      )
    } catch (error) {
      // TODO error handling
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void doGetOrders()
  }, [token])

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }
  if (loading) {
    return (
      <div className="OrderView Loading">
        <div className="Loading">
          <img src={Rocket} />
        </div>
      </div>
    )
  }
  if (!orders.length) {
    return <div className="OrderView None">No orders yet!</div>
  }
  return (
    <div className="OrderView">
      <table>
        <th>
          <td>Term</td>
          <td>Amount</td>
          <td>Submitted</td>
        </th>
        {orders.map((order) => (
          <Order
            term={order.term}
            amount={order.amount}
            created_at={order.created_at}
          />
        ))}
      </table>
    </div>
  )
}
