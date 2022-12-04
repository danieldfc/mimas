import React, { createContext, useCallback, useContext, useState } from 'react'

import api from '@mimas/axios-config'

interface User {
  id: string
  name: string
  email: string
  nick: string
}

interface AuthState {
  token: string
  user: User
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  signIn(creadentials: SignInCredentials): Promise<void>
  signOut(): void
  updateUser(user: User): void
}

const LOCAL_STORAGE_GO_COSTURA = '@GoCostura'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(`${LOCAL_STORAGE_GO_COSTURA}:token`)
    const user = localStorage.getItem(`${LOCAL_STORAGE_GO_COSTURA}:user`)

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`

      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password
    })

    const { token, user } = response.data

    localStorage.setItem(`${LOCAL_STORAGE_GO_COSTURA}:token`, token)
    localStorage.setItem(
      `${LOCAL_STORAGE_GO_COSTURA}:user`,
      JSON.stringify(user)
    )

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(`${LOCAL_STORAGE_GO_COSTURA}:token`)
    localStorage.removeItem(`${LOCAL_STORAGE_GO_COSTURA}:user`)

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem(
        `${LOCAL_STORAGE_GO_COSTURA}:user`,
        JSON.stringify(user)
      )

      setData({
        token: data.token,
        user
      })
    },
    [data.token, setData]
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used withing an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
