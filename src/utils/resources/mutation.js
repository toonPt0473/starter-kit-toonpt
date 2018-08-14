import gql from 'graphql-tag'

import config from '../config'

const { client } = config

export const login = (param) => {
  const { name, surname, email, username, password } = param
  return client.mutate({
    mutation: gql`
      mutation($name: String!, $surname: String!, $email: String!, username: String!, password: String!) {
        signup(name: $name, surname: $surname, email: $email, username: $username, password: $password) {
          jwt
          name,
          surname,
        }
      }
    `,
    variables: { name, surname, email, username, password },
  })
}

export default null
