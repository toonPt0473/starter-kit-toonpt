// import { createSelector } from 'reselect';
import dataProvider from '../utils/dataProvider'

const provider = dataProvider()

export const auth = {
  state: {
    accessToken: false,
    userInfo: false,
    error: false,
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    setToken(state, payload) {
      return {
        ...state,
        accessToken: payload,
      }
    },
    setError(state, payload) {
      return {
        ...state,
        error: payload,
      }
    },
    setUserInfo(state, payload) {
      return {
        ...state,
        userInfo: payload,
      }
    },
    logout(state) {
      return {
        ...state,
        userInfo: false,
        accessToken: false,
      }
    },
  },
  effects: () => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async loginAsync(payload) {
      // const token = await new Promise(resolve => setTimeout(() => resolve('Some token'), 1000))
      try {
        const result = await provider.request({
          method: 'post',
          url: '/users/login',
          data: payload,
        })
        const { id: jwtToken } = result
        if (!jwtToken) {
          return Promise.reject(new Error('Token not found'))
        }
        this.setToken(jwtToken)
        return Promise.resolve()
      } catch (e) {
        this.setError(e.message)
        return Promise.reject(e)
      }
      // dispatch.Auth.setToken(token)
    },
    async getUserInfoAsync() {
      try {
        const result = await provider.request({
          method: 'get',
          url: '/users/me',
        })
        this.setUserInfo(result)
        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },
  }),
  selectors: (slice, createSelector) => ({
    isAuthenticated: () => createSelector(slice, state => !!state.accessToken),
  }),
}
