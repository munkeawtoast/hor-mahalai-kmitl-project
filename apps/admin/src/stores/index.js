import { defineStore } from 'pinia'
import { axios } from '../utils'
import { useLocalStorage } from '@vueuse/core'
import jwtDecode from 'jwt-decode'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: useLocalStorage('token', ''),
  }),
  getters: {
    parsed: state => jwtDecode(state.token),
    username: state => state.parsed?.username,
    firstname: state => state.parsed?.firstname,
    lastname: state => state.parsed?.lastname,
    email: state => state.parsed?.email,
    role: state => state.parsed?.aud,
  },
})
