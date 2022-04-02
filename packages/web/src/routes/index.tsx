import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'
import { CreateOrder } from '../pages/CreateOrder'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/order" component={CreateOrder} isPrivate />
    <Route path="/order/:orderId" component={CreateOrder} isPrivate />
  </Switch>
)

export default Routes
