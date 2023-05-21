import { defineStore } from 'pinia'
import { axios } from '../utils'
import { useLocalStorage, useAsyncState } from '@vueuse/core'
import { dormAccommodations, roomAccomodations } from '@shared/validator'
import jwtDecode from 'jwt-decode'

export const useDraftCreateStore = defineStore('createDormDraft', {
  state() {
    const defaultRoom = {
      name: '',
      price: '',
      accomodations: roomAccomodations.map(acc => ({
        name: acc,
        value: false,
      })),
    }

    const defaultDorm = {
      name: '',
      waterrate: '',
      electricityrate: '',
      description: '',
      rooms: [{ ...defaultRoom }],
      university: null,
      landmark: null,
      accomodations: dormAccommodations.map(acc => ({
        name: acc,
        value: false,
      })),
      address: '',
      lat: null,
      lng: null,
      contacts: {
        telnum: '',
        facebook: '',
        line: '',
      },
    }
    const procedureStep = useLocalStorage('createDormDraftStep', 1)
    const dorm = useLocalStorage('createDormDraft', { ...defaultDorm })
    const rooms = dorm.value.rooms
    return {
      step: procedureStep,
      dorm,
      rooms,
      defaultDorm,
      defaultRoom,
    }
  },
  actions: {
    addRoom() {
      const newRoom = { ...this.defaultRoom }
      this.rooms.push(newRoom)
    },
  },
})

export const createDraftEditStore = id =>
  defineStore(
    `createDraftEditStore-${id}`,
    (`createDraftEditStore-${id}`,
    {
      state: () => {
        const defaultRoom = {
          name: 'test',
          price: '0',
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
    parsed: state => {
      try {
        return jwtDecode(state.token)
      } catch (e) {
        return { badToken: true }
      }
    },
    badToken: state => state.parsed?.badToken,
    id: state => state.parsed?.sub,
    username: state => state.parsed?.username,
    firstname: state => state.parsed?.firstname,
    lastname: state => state.parsed?.lastname,
    email: state => state.parsed?.email,
    role: state => state.parsed?.aud,
  },
})
