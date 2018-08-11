import { GET_EXAMPLE_MODEL } from './constants'
import Resource from '../../utils/resources/'

export const getCurrentUser = params => dispatch => {
  Resource.getCurrentUser(params)
    .then((response) =>
      dispatch({
        type: GET_EXAMPLE_MODEL.success,
        payload: response,
      }))
    .catch(error =>
      dispatch({
        type: GET_EXAMPLE_MODEL.failure,
        error,
      }))
}
