import gql from 'graphql-tag'
import config from '../../utils/apollo-config'

const { client } = config

export function defualtQuery() {
  return client.query({
    // query string form graph document
    query: gql``,
    // declare variable for query
    variables: {},
  })
}

export const login = (param) => {
  const { email, password } = param
  return client.mutate({
    mutation: gql`
      mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          jwt
          firstname
          lastname
        }
      }
    `,
    variables: { email, password },
  })
}

export const register = (param) => {
  const { username, password } = param
  return client.mutate({
    mutation: gql`
      mutation($username: String!, $password: String!)
      {
        signup(username: $username, password: $password)
        {
          jwt
          username
        }
      }
    `,
    variables: { username, password },
  })
}

export default {
  defualtQuery,
  login,
  register,
}
