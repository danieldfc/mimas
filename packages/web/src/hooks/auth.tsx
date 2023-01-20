import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { Cookies, useCookies } from 'react-cookie'

import { AxiosError } from 'axios'

import { api } from '../services/api'

interface User {
  id: string
  name: string
  email: string
  nick: string
}

interface AuthState {
  token: string
  refreshToken: string
  user: User
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  isAuthenticated: boolean
  signIn(creadentials: SignInCredentials): Promise<void>
  signOut(): void
  updateUser(user: User): void
}

interface AuthProviderProps {
  children: ReactNode
}

const LOCAL_STORAGE_GO_COSTURA = '@GoCostura'

let IS_REFRESHING = false
let failedRequestsQueue: Array<{
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError) => void
}> = []

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [cookie, setCookie] = useCookies([
    `${LOCAL_STORAGE_GO_COSTURA}.token`,
    `${LOCAL_STORAGE_GO_COSTURA}.refreshToken`
  ])

  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem(`${LOCAL_STORAGE_GO_COSTURA}.user`)
    const token = cookie[`${LOCAL_STORAGE_GO_COSTURA}.token`]
    const refreshToken = cookie[`${LOCAL_STORAGE_GO_COSTURA}.refreshToken`]

    if (token && refreshToken && user) {
      api.defaults.headers.authorization = `Bearer ${refreshToken}`

      return { token, user: JSON.parse(user), refreshToken }
    }

    return {} as AuthState
  })

  useEffect(() => {
    const user = localStorage.getItem(`${LOCAL_STORAGE_GO_COSTURA}.user`)
    const token = cookie[`${LOCAL_STORAGE_GO_COSTURA}.token`]
    const refreshToken = cookie[`${LOCAL_STORAGE_GO_COSTURA}.refreshToken`]

    if (token && refreshToken && user) {
      api.defaults.headers.authorization = `Bearer ${refreshToken}`
    }
  }, [])

  const isAuthenticated = !!data.user

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.post('/sessions', {
        email,
        password
      })

      const { token, user, refreshToken } = response.data

      setCookie('@GoCostura.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie('@GoCostura.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      localStorage.setItem(
        `${LOCAL_STORAGE_GO_COSTURA}.user`,
        JSON.stringify(user)
      )

      api.defaults.headers.authorization = `Bearer ${refreshToken}`

      setData({ token, user, refreshToken })
    },
    [setCookie]
  )

  const signOut = useCallback(() => {
    localStorage.removeItem(`${LOCAL_STORAGE_GO_COSTURA}:token`)
    localStorage.removeItem(`${LOCAL_STORAGE_GO_COSTURA}:refreshToken`)
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
        user,
        refreshToken: data.refreshToken
      })
    },
    [data.token, data.refreshToken, setData]
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, isAuthenticated }}
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

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const originalConfig = error.config

      if (!IS_REFRESHING) {
        const cookies = new Cookies()

        const refreshToken = cookies.get(
          `${LOCAL_STORAGE_GO_COSTURA}.refreshToken`
        )

        api
          .post<{ refreshToken: string }>('/refresh-token', {
            token: refreshToken
          })
          .then(response => {
            cookies.set(
              `${LOCAL_STORAGE_GO_COSTURA}.refreshToken`,
              response.data.refreshToken,
              {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
              }
            )
            cookies.set(
              `${LOCAL_STORAGE_GO_COSTURA}.token`,
              response.data.refreshToken,
              {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
              }
            )
            api.defaults.headers.authorization = `Bearer ${response.data.refreshToken}`
            IS_REFRESHING = true

            failedRequestsQueue.forEach(request =>
              request.onSuccess(response.data.refreshToken)
            )
            failedRequestsQueue = []
          })
          .catch(err => {
            failedRequestsQueue.forEach(request => request.onFailure(err))
            failedRequestsQueue = []
          })
          .finally(() => {
            IS_REFRESHING = false
          })
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers.authorization = `Bearer ${token}`
            resolve(api(originalConfig))
          },
          onFailure: (err: AxiosError) => {
            reject(err)
          }
        })
      })
    }
  }
)

export { AuthProvider, useAuth }
