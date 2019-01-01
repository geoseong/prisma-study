const fetch = require('node-fetch')

const endpoint = 'http://localhost:4000'
// const query = `
// mutation {
//   updatePost(
//     where: {id: "cjqdtu27q00dx0871m4dvb91z"}
//     data: {
//       title: "park geoseong"
//       published: true
//     }
//   ) {
//     id
//     title
//     published
//   }
// }
// `
const query = `
mutation {
  deletePost(
    where: {id: "cjqdtu0m000ds08710lqbyqde"}
  ) {
    id
    title
    published
  }
}
`
// const query = `
// query {
//   post(
//     where: {id: "cjqdtu0m000ds08710lqbyqde"}
//   ) {
//     id
//     title
//     published
//   }
// }
// `
// const query = `
// mutation {
//   createPost(data: {
//     title: "miyawaki haseyo"
//     published: true
//   }) {
//     id
//     title
//     published
//   }
// }
// `
console.log('args:', JSON.stringify(process.argv, null, 2))


fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({query: query})
})
  .then(response => response.json())
  .then(data => console.log('result:', JSON.stringify(data, null, 2)))