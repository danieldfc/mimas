import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import SignIn from '../pages/Auth/SignIn'
import ListOrders from '../pages/Orders/ListOrders'
import { CreateOrder } from '../pages/Orders/CreateOrder'
import { ListClients } from '../pages/Clients/ListClients'
import { CreateClient } from '../pages/Clients/CreateClient'
import { Specifications } from '../pages/Orders/Specifications'
import Suppliers from '../pages/Suppliers'
import { CreateSupplier } from '../pages/Suppliers/CreateSupplier'
import Profile from '../pages/Profile'
import { ShowClient } from '../pages/Clients/ShowClient'
import ListNotifications from '../pages/Notifications/ListNotifications'
import ShowNotification from '../pages/Notifications/ShowNotification'
import ListEmployees from '../pages/Employees/ListEmployees'
import CreateEmployee from '../pages/Employees/CreateEmployee'
import ShowEmployee from '../pages/Employees/ShowEmployee'

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

    <Route path="/suppliers" component={Suppliers} isPrivate />
    <Route path="/create-supplier" component={CreateSupplier} isPrivate />

    <Route path="/employees" exact component={ListEmployees} isPrivate />
    <Route path="/employees/:id" component={ShowEmployee} isPrivate />
    <Route path="/create-employee" component={CreateEmployee} isPrivate />

    <Route
      path="/notifications"
      exact
      component={ListNotifications}
      isPrivate
    />
    <Route path="/notifications/:id" component={ShowNotification} isPrivate />
  </Switch>
)

export default Routes
