export const count = {
  state: {
    list: [],
    findById: {},
    update: {},
  },
  reducers: {
    changeList(state, payload) {
      return {
        ...state,
        list: payload,
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
