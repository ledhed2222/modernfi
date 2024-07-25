import classnames from 'classnames'
import * as d3 from 'd3'
import React, { useState, useMemo, useEffect, useRef } from 'react'

export interface YieldDatum {
  term: string
  rate: number
}

interface Props {
  width: number
  height: number
  data: YieldDatum[]
}

interface TooltipData extends YieldDatum {
  xPos: number
  yPos: number
}

const MARGIN = {
  top: 30,
  right: 30,
  bottom: 50,
  left: 50,
}

export function Plot({ width, height, data }: Props): JSX.Element {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false)
  const [tooltipData, setTooltipData] = useState<TooltipData>({
    ...data[0],
    xPos: 0,
    yPos: 0,
  })
  const axesRef = useRef(null)

  const boundsWidth = width - MARGIN.right - MARGIN.left
  const boundsHeight = height - MARGIN.top - MARGIN.bottom

  const xScale = useMemo(() => {
    return d3.scalePoint(
      data.map((datum: YieldDatum) => datum.term),
      [0, boundsWidth],
    )
  }, [width])

  const yScale = useMemo(() => {
    return d3.scaleLinear(
      d3.extent(data, (datum: YieldDatum) => datum.rate) as [number, number],
      [boundsHeight, 0],
    )
  }, [height])

  const line = d3.line(
    (datum: YieldDatum): number => xScale(datum.term) || 0,
    (datum: YieldDatum) => yScale(datum.rate),
  )

  useEffect(() => {
    const svgElement = d3.select(axesRef.current)
    svgElement.selectAll('*').remove()

    const xAxisGenerator = d3.axisBottom(xScale)
    svgElement
      .append('g')
      .attr('transform', `translate(0,${boundsHeight})`)
      .call(xAxisGenerator)

    const yAxisGenerator = d3.axisLeft(yScale)
    svgElement.append('g').call(yAxisGenerator)
  }, [xScale, yScale])

  /* eslint-disable react/no-array-index-key --
   * fine for SVG purposes here */
  return (
    <div className="Plot">
      <svg width={width} height={height}>
        {/* Actual line */}
        <g
          fill="none"
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            d={line(data) || undefined}
          />
        </g>
        {/* Data point circles */}
        <g
          fill="white"
          stroke="currentColor"
          strokeWidth="1.5"
          transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        >
          {data.map((datum, i) => (
            <circle
              key={i}
              cx={xScale(datum.term)}
              cy={yScale(datum.rate)}
              r="2.5"
              onMouseOver={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
              onMouseMove={() => {
                setTooltipData({
                  ...data[i],
                  xPos: xScale(datum.term) || 0,
                  yPos: yScale(datum.rate),
                })
              }}
            />
          ))}
        </g>
        {/* Tooltip */}
        <g
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
          className={classnames('tooltip', { visible: tooltipVisible })}
        >
          <rect
            width={175}
            height={60}
            x={tooltipData.xPos - 15}
            y={tooltipData.yPos - 30}
            stroke="#cccccc"
            strokeWidth="1"
            fill="#ffffff"
          />
          <g>
            <text
              textAnchor="start"
              x={tooltipData.xPos}
              y={tooltipData.yPos}
              fontSize={16}
              fontWeight="bold"
            >
              {tooltipData.term}: {tooltipData.rate}%
            </text>
          </g>
        </g>
        {/* Axes */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        />
      </svg>
    </div>
  )
  /* eslint-enable react/no-array-index-key */
}
