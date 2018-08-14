import gql from 'graphql-tag'
import config from '../config'

const { client } = config

export const getCurrentUser = () => client
  .query({
    query: gql`
    {
      getMe {
        name
        username
        surname
      }
    }
    `,
  })
  .then(({ data }) => data.getMe)
  .catch(error => error)

export default {
  getCurrentUser,
}
