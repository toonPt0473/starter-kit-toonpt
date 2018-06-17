import { GET_EXAMPLE_MODEL } from './constants'
import Resource from '../../utils/resource'

const Model = new Resource('/Model', {
  // customMethod: {
  //   url: '{id}/pathname',
  //   method: 'get', // get, post, put, delete
  //   defaultParams: {
  //     id: 'me',
  //   },
  // },
})

export const getPurchaseReceiptById = param => dispatch => {
  dispatch(GET_EXAMPLE_MODEL.request)
  Model.find(param)
    .then(response =>
      dispatch({
        type: GET_EXAMPLE_MODEL.success,
        payload: response,
      }))
    .catch(error => dispatch({ type: GET_EXAMPLE_MODEL.failure, error }))
}
