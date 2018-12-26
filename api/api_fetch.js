const fetch = require('node-fetch')

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

fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + process.argv[5],
  },
  body: JSON.stringify({ 
    query: query, 
    variables: variables 
  }),
})
  .then(response => response.json())
  .then(data => console.log('result:', JSON.stringify(data, null, 2)))