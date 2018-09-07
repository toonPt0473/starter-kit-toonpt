import Resource from '../../utils/resource'

const ExampleAPI = new Resource('/Schools', {
  buySubject: {
    url: '{id}/helloworld',
    method: 'get',
  },
})

export const example = {
  state: {
    getList: {
      data: [],
      error: null,
    },
    getOne: {
      data: {},
      error: null,
    },
  },
  reducers: {
    getListReducer(state, payload) {
      return {
        ...state,
        getList: {
          data: payload,
          error: null,
        },
      }
    },
  },
  effects: (dispatch) => ({
    async getListEffect(filter) {
      const result = await ExampleAPI.find({ filter })
      dispatch.example.getListReducer(result)
    },
  }),
}

export default example
