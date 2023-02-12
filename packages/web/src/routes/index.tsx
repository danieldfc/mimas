import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import SignIn from '../pages/Auth/SignIn'
import ListOrders from '../pages/Orders/ListOrders'
import { CreateOrder } from '../pages/Orders/CreateOrder'
import { ListClients } from '../pages/Clients/ListClients'
import { CreateClient } from '../pages/Clients/CreateClient'
import { Specifications } from '../pages/Orders/Specifications'
import { ListSuppliers } from '../pages/Suppliers/ListSuppliers'
import { CreateSupplier } from '../pages/Suppliers/CreateSupplier'
import Profile from '../pages/Profile'
import { ShowClient } from '../pages/Clients/ShowClient'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/dashboard" component={ListOrders} isPrivate />

    <Route path="/create-order" exact component={CreateOrder} isPrivate />
    <Route path="/orders/:orderId" component={Specifications} isPrivate />

    <Route path="/clients" exact component={ListClients} isPrivate />
    <Route path="/clients/:clientId" component={ShowClient} isPrivate />
    <Route path="/create-client" component={CreateClient} isPrivate />

    <Route path="/suppliers" component={ListSuppliers} isPrivate />
    <Route path="/create-supplier" component={CreateSupplier} isPrivate />
  </Switch>
)

export default Routes
