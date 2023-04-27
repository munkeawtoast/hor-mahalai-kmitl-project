import bareAxios from 'axios'

let FOREVER_TOKEN
FOREVER_TOKEN = 'forever_token'

const axios = bareAxios.create({
  baseURL: 'http://localhost:3500/admin',
})

axios.interceptors.request.use(
  (config) => {
    if (FOREVER_TOKEN) {
      config.headers.Authorization = `Bearer ${FOREVER_TOKEN}`
    }
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export { axios }
