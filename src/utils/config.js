import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const env = process.env.NODE_ENV || 'defaultConfig'

let baseUrl = 'http://localhost:9000'
if (env !== 'development') {
  baseUrl = ''
}

const httpLink = createHttpLink({
  uri: `${baseUrl}/graphql`,
  opts: {
    credentials: 'same-origin',
  },
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default {
  client,
}
