import { AxiosError, AxiosRequestConfig } from 'axios'
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { Cookies, useCookies } from 'react-cookie'

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

const GO_COSTURA = '@GoCostura'
const maxAgeToken = 60 * 45 // 45 minutos
const maxAgeRefreshToken = 60 * 60 * 24 * 30 // 30 dias
let IS_REFRESHING = false
let failedRequestsQueue: Array<{
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError) => void
}> = []

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [cookie, setCookie, removeCookie] = useCookies([
    `${GO_COSTURA}.token`,
    `${GO_COSTURA}.refreshToken`
  ])

  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem(`${GO_COSTURA}.user`)
    const token = cookie[`${GO_COSTURA}.token`]
    const refreshToken = cookie[`${GO_COSTURA}.refreshToken`]

    if (token && refreshToken && user) {
      api.defaults.headers.authorization = `Bearer ${token}`

      return { token, user: JSON.parse(user), refreshToken }
    }

    return {} as AuthState
  })

  useEffect(() => {
    const user = localStorage.getItem(`${GO_COSTURA}.user`)
    const token = cookie[`${GO_COSTURA}.token`]
    const refreshToken = cookie[`${GO_COSTURA}.refreshToken`]

    if (token && refreshToken && user) {
      api.defaults.headers.authorization = `Bearer ${token}`
    }
  }, [cookie])

  const isAuthenticated = !!data.user

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      const response = await api.post('/sessions', {
        email,
        password
      })

      if (!response) {
        throw new Error('Erro ao criar a sessão do usuário')
      }

      const { token, user, refreshToken } = response.data

      setCookie(`${GO_COSTURA}.token`, token, {
        maxAge: maxAgeToken,
        path: '/'
      })

      setCookie(`${GO_COSTURA}.refreshToken`, refreshToken, {
        maxAge: maxAgeRefreshToken,
        path: '/'
      })

      localStorage.setItem(`${GO_COSTURA}.user`, JSON.stringify(user))

      api.defaults.headers.authorization = `Bearer ${token}`

      setData({ token, user, refreshToken })
    },
    [setCookie]
  )

  const signOut = useCallback(() => {
    removeCookie(`${GO_COSTURA}.token`)
    removeCookie(`${GO_COSTURA}.refreshToken`)
    localStorage.removeItem(`${GO_COSTURA}:user`)

    setData({} as AuthState)
  }, [removeCookie])

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem(`${GO_COSTURA}:user`, JSON.stringify(user))

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

type IResponseRefreshToken = {
  refreshToken: string
  token: string
}

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const originalConfig = error.config as AxiosRequestConfig

      if (!IS_REFRESHING) {
        const cookies = new Cookies()

        const refreshToken = cookies.get(`${GO_COSTURA}.refreshToken`)

        api
          .post<IResponseRefreshToken>('/refresh-token', {
            token: refreshToken
          })
          .then(response => {
            cookies.set(
              `${GO_COSTURA}.refreshToken`,
              response.data.refreshToken,
              {
                maxAge: maxAgeRefreshToken,
                path: '/'
              }
            )
            cookies.set(`${GO_COSTURA}.token`, response.data.token, {
              maxAge: maxAgeToken,
              path: '/'
            })
            api.defaults.headers.authorization = `Bearer ${response.data.token}`
            IS_REFRESHING = true

            failedRequestsQueue.forEach(request =>
              request.onSuccess(response.data.token)
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
            if (originalConfig.headers) {
              originalConfig.headers.authorization = `Bearer ${token}`
            }
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
