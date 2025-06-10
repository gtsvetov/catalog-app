import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://example.com/graphql', // заменить на настоящий endpoint
  cache: new InMemoryCache(),
})
