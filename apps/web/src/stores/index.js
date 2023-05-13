import { defineStore } from 'pinia'
import { axios } from '../utils'
import {
  useLocalStorage,
  watchDebounced,
  useAsyncState,
  useTimeoutFn,
} from '@vueuse/core'
import { dormAccommodations, roomAccomodations } from '@shared/validator'

export const useDraftCreateStore = defineStore('createDormDraft', {
  state: () => {
    const defaultRoom = {
      name: 'test',
      price: 0,
      longitude: 0,
      latitude: 0,
      description: '',
      accomodations: roomAccomodations.map((acc) => ({
        name: acc,
        value: false,
      })),
    }

    const defaultDorm = {
      name: '',
      waterRate: '',
      electricityRate: '',
      description: '',
      rooms: [{ ...defaultRoom }],
      university: null,
      landmark: null,
      accomodations: dormAccommodations.map((acc) => ({
        name: acc,
        value: false,
      })),
      landmarkOptions: [],
    }
    const procedureStep = useLocalStorage('createDormDraftStep', 1)
    const dorm = useLocalStorage('createDormDraft', { ...defaultDorm })
    const rooms = dorm.value.rooms

    return {
      step: procedureStep,
      dorm,
      defaultDorm,
      rooms,
      defaultRoom,
    }
  },
  actions: () => ({
    addRoom: () => {
      const getDefaultRoom = () => ({
        name: '',
        images: [],
        accomodations: [],
      })
      const newRoom = getDefaultRoom()
      this.rooms.push(newRoom)
      return newRoom
    },
  }),
})

export const createDraftEditStore = (id) =>
  defineStore(
    `createDraftEditStore-${id}`,
    (`createDraftEditStore-${id}`,
    {
      state: () => {
        const defaultRoom = {
          name: 'test',
          price: 0,
          water: '',
          waterMode: 'number',
          electricity: '',
          accomodations: roomAccomodations.map((acc) => ({
            name: acc,
            value: false,
          })),
        }

        const defaultDorm = useAsyncState(
          axios.get(`/dorms/${id}`).then((res) => res.data),
          {
            name: '',
            waterrate: '',
            electricityrate: '',
            rooms: [{ ...defaultRoom }],
            accomodations: dormAccommodations.map((acc) => ({
              name: acc,
              value: false,
            })),
          },
        )

        const dorm = useLocalStorage('createDormDraft', { ...defaultDorm })
        const rooms = dorm.value.rooms

        return {
          dorm,
          defaultDorm,
          rooms,
          defaultRoom,
        }
      },
      actions: () => ({
        addRoom: () => {
          const getDefaultRoom = () => ({
            name: '',
            images: [],
            accomodations: [],
          })
          const newRoom = getDefaultRoom()
          this.rooms.push(newRoom)
          return newRoom
        },
      }),
      getters: () => ({}),
    }),
  )

export const useUserStore = defineStore('user', {
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
