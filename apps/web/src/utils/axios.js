import bareAxios from 'axios'
import { useUserStore } from '../stores'

let FOREVER_TOKEN
FOREVER_TOKEN = 'forever_token'

const axios = bareAxios.create({
  baseURL: 'http://localhost:3500/web',
})

axios.interceptors.request.use(
  config => {
    const { token } = useUserStore()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    if (FOREVER_TOKEN) {
      config.headers.Authorization = `Bearer ${FOREVER_TOKEN}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export { axios }
