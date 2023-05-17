import { defineStore } from 'pinia'
import { axios } from '../utils'
import {
  useLocalStorage,
  watchDebounced,
  useAsyncState,
  useTimeoutFn,
} from '@vueuse/core'
import { dormAccommodations, roomAccomodations } from '@shared/validator'
import jwtDecode from 'jwt-decode'

export const useDraftCreateStore = defineStore('createDormDraft', {
  state: () => {
    const defaultRoom = {
      name: 'test',
      price: 0,
      longitude: 0,
      latitude: 0,
      description: '',
      accomodations: roomAccomodations.map(acc => ({
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
      accomodations: dormAccommodations.map(acc => ({
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

export const createDraftEditStore = id =>
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
          accomodations: roomAccomodations.map(acc => ({
            name: acc,
            value: false,
          })),
        }

        const defaultDorm = useAsyncState(
          axios.get(`/dorms/${id}`).then(res => res.data),
          {
            name: '',
            waterrate: '',
            electricityrate: '',
            rooms: [{ ...defaultRoom }],
            accomodations: dormAccommodations.map(acc => ({
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
