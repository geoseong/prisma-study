const { GraphQLClient } = require('graphql-request')

const endpoint = 'http://localhost:4466'
const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: 'Bearer ' + process.argv[5],
  },
})

const query = `
  mutation($name: String!, $email: String!, $post: PostCreateWithoutAuthorInput!) {
    createUser(data: {
      name: $name
      email: $email
      posts: { create: [$post] }
    }) {
      id
    }
  }
`

console.log('args:', JSON.stringify(process.argv, null, 2))

const variables = { 
  name: process.argv[2],
  email: process.argv[3],
  post: JSON.parse(process.argv[4])
}

client.request(query, variables)
  .then(data => console.log(data))