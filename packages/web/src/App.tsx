import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './routes'
import GlobalStyle from './styles/global'

import AppProvider from './hooks'

export default function App() {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </Router>
  )
}
