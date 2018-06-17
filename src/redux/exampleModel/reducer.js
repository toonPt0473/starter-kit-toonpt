import { GET_EXAMPLE_MODEL } from './constants'

const initialState = {
  payload: {},
  loading: false,
  error: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_EXAMPLE_MODEL.request:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case GET_EXAMPLE_MODEL.success:
      return {
        ...state,
        loading: false,
        error: false,
        payload: action.payload,
      }
    case GET_EXAMPLE_MODEL.failure:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}
