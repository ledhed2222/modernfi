import React from 'react'
import { useCookies } from 'react-cookie'
import { useLocation, useOutlet } from 'react-router-dom'
import { SwitchTransition, CSSTransition as CST } from 'react-transition-group'

import { CookieType } from './CONSTANTS'
import { NavBar } from './NavBar'
import { ROUTES } from './ROUTES'
import './App.scss'

export function App(): JSX.Element {
  const loc = useLocation()
  const out = useOutlet()
  const nodeRef = ROUTES.find((route) => route.path === loc.pathname)?.nodeRef
  const [cookies] = useCookies(['token'])
  const token = (cookies as CookieType).token
  const isLoggedIn = token != null

  return (
    <div className="App">
      <NavBar loggedIn={isLoggedIn} />
      <div className="ContentPortal">
        <SwitchTransition>
          <CST
            key={loc.key}
            classNames="fade"
            timeout={300}
            nodeRef={nodeRef}
            unmountOnExit
          >
            <div ref={nodeRef} className="Content">
              {out}
            </div>
          </CST>
        </SwitchTransition>
      </div>
    </div>
  )
}
