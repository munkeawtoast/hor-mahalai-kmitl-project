import { defineStore } from 'pinia'
import { axios } from '~utils/index.js'
import { useLocalStorage } from '@vueuse/core'

export const useUserStore = defineStore({
  id: 'persistentUser',
  state: () => ({
    token: useLocalStorage('token', ''),
    user: useLocalStorage('user', {
      username: '',
      firstName: '',
      lastName: '',
    }),
  }),
  getters: () => ({
    token: (state) => state.token,
    loggedIn: (state) => !!state.token,
    username: (state) => state.user.username,
    firstName: (state) => state.user.firstName,
    lastName: (state) => state.user.lastName,
  }),
  actions: () => ({
    async login(username, password) {
      // const { data } = await axios.post('/auth/login', {
      //   username,
      //   password,
      // })

      // test
      const data = {
        token: 'aaa',
        user: {
          username: 'aaa',
          firstName: 'aaa',
          lastName: 'aaa',
        },
      }

      this.token = data.token
      this.$patch((state) => {
        state.user.username = data.user.username
        state.user.firstName = data.user.firstName
        state.user.lastName = data.user.lastName
      })
    },
    async logout() {
      this.$patch
    },
  }),
})
