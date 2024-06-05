// apollo.js
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'YOUR_GRAPHQL_API_URI',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;