import bareAxios from 'axios'
import { useUserStore } from '../stores'


const axios = bareAxios.create({
  baseURL: 'http://localhost:3500/web',
})

axios.interceptors.request.use(
  config => {
    const { token } = useUserStore()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export { axios }
