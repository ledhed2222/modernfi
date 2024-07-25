import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { termLabel } from '../CONSTANTS'
import Rocket from '../Rocket.gif'

import { Plot, YieldDatum } from './Plot'
import './index.scss'

interface ApiRecord {
  term: number
  rate: number
}

// TODO dynamic
const WIDTH = 640
const HEIGHT = 400

export function Graph(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [yields, setYields] = useState<YieldDatum[]>([])

  useEffect(() => {
    async function getYields() {
      setLoading(true)
      const today = new Date()
      setYields(
        (
          await axios.request<ApiRecord[]>({
            method: 'get',
            url: '/api/yields',
          })
        ).data.map((datum) => {
          return {
            rate: datum.rate,
            term: termLabel(datum.term),
          }
        }),
      )
      setLoading(false)
    }
    void getYields()
  }, [])

  if (loading || yields.length === 0) {
    return (
      <div className="Graph">
        <div className="Loading">
          <img src={Rocket} />
        </div>
      </div>
    )
  }
  return (
    <div className="Graph">
      <h2>Today&apos;s Yield Curve</h2>
      <Plot width={WIDTH} height={HEIGHT} data={yields} />
    </div>
  )
}
