import React, { ReactNode, RefObject, createRef } from 'react'

import { Graph } from './Graph'
import { Login } from './Login'
import { Logout } from './Logout'
import { OrderSubmit } from './OrderSubmit'
import { OrderView } from './OrderView'
import { Signup } from './Signup'

type UserState = 'LoggedIn' | 'LoggedOut'

interface RouteDef {
  path: string
  Component: ReactNode
  navName: string
  nodeRef: RefObject<HTMLDivElement>
  requiresState?: UserState
}

export const ROUTES: RouteDef[] = [
  {
    path: '/',
    Component: <Graph />,
    navName: 'Current Yield Curve',
  },
  {
    path: '/login',
    Component: <Login />,
    navName: 'Login',
    requiresState: 'LoggedOut' as UserState,
  },
  {
    path: '/order_view',
    Component: <OrderView />,
    navName: 'View Orders',
    requiresState: 'LoggedIn' as UserState,
  },
  {
    path: '/order_submit',
    Component: <OrderSubmit />,
    navName: 'Submit Order',
    requiresState: 'LoggedIn' as UserState,
  },
  {
    path: '/signup',
    Component: <Signup />,
    navName: 'Signup',
    requiresState: 'LoggedOut' as UserState,
  },
  {
    path: '/logout',
    Component: <Logout />,
    navName: 'Logout',
    requiresState: 'LoggedIn' as UserState,
  },
].map((route) => Object.assign(route, { nodeRef: createRef<HTMLDivElement>() }))
