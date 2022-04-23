import React from 'react'
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect
} from 'react-router-dom'

import { useAuth } from '../hooks/auth'

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean
  component: React.FunctionComponent
}

function Route({
  isPrivate = false,
  component: Component,
  ...rest
}: RouteProps) {
  const { user } = useAuth()

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }
            }}
          />
        )
      }}
    />
  )
}

export default Route
