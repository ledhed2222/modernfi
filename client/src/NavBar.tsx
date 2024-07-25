import React from 'react'
import { NavLink } from 'react-router-dom'

import { ROUTES } from './ROUTES'

interface Props {
  loggedIn: boolean
}

export function NavBar({ loggedIn }: Props): JSX.Element {
  return (
    <nav className="NavBar">
      <ul>
        {ROUTES.filter(({ requiresState }) => {
          return (
            requiresState == null ||
            (loggedIn
              ? requiresState === 'LoggedIn'
              : requiresState === 'LoggedOut')
          )
        }).map(({ path, navName }) => (
          <li key={path}>
            <NavLink className="NavLink" to={path}>
              {navName}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
