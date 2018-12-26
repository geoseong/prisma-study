const { request } = require('graphql-request')

/**
 * request does not support passing headers to the request (yet). 
 * Therefore, this particular example 
 * assumes your Prisma service was deployed without a service secret.
 */
const endpoint = 'http://localhost:4466'
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

request(endpoint, query,  variables)
  .then(data => console.log(data))