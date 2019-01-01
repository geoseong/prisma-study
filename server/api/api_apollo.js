// Prisma Tutorial...: https://www.prisma.io/docs/prisma-graphql-api/usage/using-the-prisma-graphql-api-nms2/#apollo-client
const { ApolloClient } = require('apollo-boost')

/**** test failed.
// https://www.npmjs.com/package/apollo-client
// const ApolloClient = require('apollo-boost')

// https://github.com/apollographql/apollo-client/issues/3639#issuecomment-402580590
// const ApolloBoost = require('apollo-boost')
// const ApolloClient = ApolloBoost.default

// const fetch = require('node-fetch')
// const { createHttpLink } = require('apollo-link-http')
// const {ApolloClient} = require('apollo-client')

// const client = new ApolloClient({
//   link: createHttpLink({
//     uri: endpoint,
//     fetch:fetch,
//   })
// });
 */

const gql = require('graphql-tag')
const endpoint = 'http://localhost:4466'

const client = new ApolloClient({
  uri: endpoint
});

const query = gql`
  query {
    users {
      id
      name
    }
  }
`
const mutation = gql`
  mutation($name: String!) {
    createUser(data: {
      name: $name
    }) {
      id
    }
  }
  `
console.log('args:', JSON.stringify(process.argv, null, 2))

if (process.argv[2] === 'query') {
  client.query({
    query: query,
  })
    .then(data => console.log(data))
} else if (process.argv[2] === 'mutate') {
  client.mutate({
    mutation: mutation,
    variables: process.argv[3]
  })
    .then(data => console.log(data))
} else {
  console.log('you have to input type \'query\' or \'mutate\' at first argument.')
}
