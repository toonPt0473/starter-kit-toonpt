import dataProvider from './dataProvider'

export default function (model, apiUrl) {
  const endpoint = `/${model}`
  const provider = dataProvider(endpoint, apiUrl)
  const resource = {
    endpoint,
    provider,
    state: {
      data: {},
      ids: [],
      errors: null,
      dirty: false,
    },
    reducers: {
      findById(state, payload) {
        state.data[payload.id] = payload
        return {
          ...state,
          errors: null,
        }
      },
      find(state, payload) {
        const newData = payload.reduce((res, o) => {
          res[o.id] = o
          return res
        }, {})
        return {
          ...state,
          data: {
            ...newData,
          },
          errors: null,
        }
      },
      delete(state, payload) {
        delete state.data[payload.id]
        state.errors = null
        return state
      },
      create(state, payload) {
        state.data.new = payload
        state.errors = null
        return state
      },
      update(state) {
        state.errors = null
        return state
      },
      error(state, payload) {
        return {
          ...state,
          errors: payload,
        }
      },
    },
    effects: {
      async findAsync(payload) {
        try {
          const result = await provider.find(payload)
          return this.find(result)
        } catch (e) {
          this.error(e)
          return Promise.reject(e)
        }
      },
      async findByIdAsync(payload, rootState) {
        try {
          if (!rootState[model].data[payload.id] || payload.forceReload) {
            const result = await provider.findById(payload)
            this.findById(result)
            return
          }
        } catch (e) {
          this.error(e)
        }
      },
      async deleteAsync(payload) {
        try {
          const { id } = payload
          this.delete({ id })
          return await provider.delete(payload)
        } catch (e) {
          this.error(e)
          return Promise.reject(e)
        }
      },
      async updateAsync(payload) {
        try {
          const { id } = payload
          this.update(payload)
          await provider.update(payload)
          return await this.findByIdAsync({ id, forceReload: true })
        } catch (e) {
          this.error(e)
          return Promise.reject(e)
        }
      },
      async createAsync({ loadData = true, ...payload }) {
        try {
          this.create(payload)
          const result = await provider.create(payload)
          const { id } = result
          if (loadData) {
            await this.findByIdAsync({ id, forceReload: true })
          }
          this.delete({ id: 'new' })
          return result
        } catch (e) {
          this.error(e)
          return Promise.reject(e)
        }
      },
    },
  }
  return resource
}
