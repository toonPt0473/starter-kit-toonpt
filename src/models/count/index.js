import query from './query'

export const count = {
  state: {
    list: {
      data: [],
      error: null,
    },
    findById: {
      data: {},
      error: null,
    },
    update: {
      data: {},
      error: null,
    },
  },
  reducers: {
    changeList(state, payload) {
      return {
        ...state,
        list: {
          error: null,
          data: payload,
        },
      }
    },
    listError(state, payload) {
      return {
        ...state,
        list: {
          ...state.list,
          error: payload,
        },
      }
    },
    changeFindById(state, payload) {
      return {
        ...state,
        findById: payload,
      }
    },
    changeUpdate(state, payload) {
      return {
        ...state,
        update: payload,
      }
    },
  },
  // effects: (dispatch) => ({
  //   async getCountList(payload) {
  //     const result = await countAPI.find({ payload })
  //     dispatch.count.changeList(result)
  //   },
  // }),
}

export default count
