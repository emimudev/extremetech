import { LoginResponse } from '@/types/v2'
import { APIResponse } from '@/types/v2/api-response'
import axios, { AxiosResponse } from 'axios'
import { AuthService } from './auth-service'
import { store } from '@/store'
import { readWriteAuthAtom } from '@/atoms/v2/auth-atom'

export const api = axios.create()

// let isRefreshing = false
// let failedQueue: {
//   resolve: (value: any | PromiseLike<any>) => void
//   reject: (reason?: any) => void
// }[] = []

// const processQueue = (error?: Error | null, token: string | null = null) => {
//   console.log({ failedQueue })
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error)
//     } else {
//       prom.resolve(token)
//     }
//   })

//   failedQueue = []
// }

const unauthorizedRoutes = [
  '/auth/login',
  '/auth/signup',
  '/auth/refresh-token',
  '/auth/logout'
]

// axios.interceptors.request.use(
//   async (config) => {
//     console.log({ config, url: config.url })
//     if (unauthorizedRoutes.find((route) => config.url?.includes(route))) {
//       console.log('is unauthorized route....', { config, url: config.url })
//       config.headers.Authorization = undefined
//       // return config
//     }
//     // console.log('Intercepting request....')
//     // console.log('Getting localAuth....')
//     // const authLocalStr = localStorage.getItem('auth')
//     // if (authLocalStr) {
//     //   const auth: LoginResponse = JSON.parse(authLocalStr)
//     //   console.log({ localAuth: auth })
//     //   config.headers = {
//     //     Authorization: `Bearer ${auth.token.accessToken}`,
//     //     Accept: 'application/json',
//     //     'Content-Type': 'application/x-www-form-urlencoded'
//     //   } as any
//     // }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// axios.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (err) => {
//     const originalRequest = err.config

//     if (err.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject })
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = 'Bearer ' + token
//             return axios(originalRequest)
//           })
//           .catch((err) => {
//             return Promise.reject(err)
//           })
//       }

//       originalRequest._retry = true
//       isRefreshing = true

//       return new Promise((resolve, reject) => {
//         AuthService.refreshToken()
//           .then((auth) => {
//             axios.defaults.headers.common.Authorization =
//               'Bearer ' + auth.token.accessToken
//             originalRequest.headers.Autorization =
//               'Bearer ' + auth.token.accessToken
//             localStorage.setItem('auth', JSON.stringify(auth.token))
//             processQueue(null, auth.token.accessToken)
//             resolve(axios(originalRequest))
//           })
//           .catch((err) => {
//             processQueue(err, null)
//             // store.dispatch(showMessage({ message: 'Expired Token' }))
//             store.set(readWriteAuthAtom, null)
//             console.error('refreshTokenError: ', { err })
//             reject(err)
//           })
//           .finally(() => {
//             isRefreshing = false
//           })

//         // axios
//         //   .post('/fooUrl/refreshToken', {
//         //     refreshToken: 'fooToken'
//         //   })
//         //   .then(({ data }) => {
//         //     axios.defaults.headers.common['Authorization'] =
//         //       'Bearer ' + data.fooToken
//         //     originalRequest.headers['Authorization'] = 'Bearer ' + data.fooToken
//         //     processQueue(null, data.fooToken)
//         //     resolve(axios(originalRequest))
//         //   })
//         //   .catch((err) => {
//         //     processQueue(err, null)
//         //     store.dispatch(showMessage({ message: 'Expired Token' }))

//         //     reject(err)
//         //   })
//         //   .then(() => {
//         //     isRefreshing = false
//         //   })
//       })
//     }

//     return Promise.reject(err)
//   }
// )

api.interceptors.request.use(
  async (config) => {
    console.log('Intercepting request....')
    console.log('Getting localAuth....')
    const authLocalStr = localStorage.getItem('auth')
    if (authLocalStr) {
      const auth: LoginResponse = JSON.parse(authLocalStr)
      console.log({ localAuth: auth })
      config.headers = {
        Authorization: `Bearer ${auth.token.accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      } as any
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  async (response) => {
    return response
  },
  async (err) => {
    try {
      console.log('InterceptorResponseError...', { err })
      const originalRequest = err.config
      console.log({ originalRequest })
      if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const loginResponse = await AuthService.refreshToken()
        console.log('hereee', { loginResponse })
        originalRequest.headers.Authorization = `Bearer ${loginResponse.token.accessToken}`
        return axios(originalRequest)
      }
    } catch (error) {
      store.set(readWriteAuthAtom, null)
      console.error('refreshTokenError: ', { error })
    }
    return Promise.reject(err)
  }
)

export const API_VERSION = 'v1'
export const PORT = 8080
export const BASE_URL = `http://localhost:${PORT}/api/${API_VERSION}`
export const buildEndpoint = (path: string) => `${BASE_URL}/${path}`
export type AxiosAPIResponse<T> = AxiosResponse<APIResponse<T>>
