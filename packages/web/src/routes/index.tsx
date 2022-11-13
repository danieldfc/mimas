import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'
import { CreateOrder } from '../pages/CreateOrder'
import { Clients } from '../pages/Clients'
import { CreateClient } from '../pages/CreateClient'
import { Specifications } from '../pages/Specifications'
import { Suppliers } from '../pages/Suppliers'
import { CreateSupplier } from '../pages/CreateSupplier'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/order" exact component={CreateOrder} isPrivate />
    <Route path="/order/:orderId" component={Specifications} isPrivate />
    <Route path="/clients" component={Clients} isPrivate />
    <Route path="/create-client" component={CreateClient} isPrivate />
    <Route path="/suppliers" component={Suppliers} isPrivate />
    <Route path="/create-supplier" component={CreateSupplier} isPrivate />
  </Switch>
)

export default Routes
