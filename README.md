# Prisma Study
*referenced to [Prisma GraphQL API Page](https://www.prisma.io/docs/prisma-graphql-api)*

## Slideshare
- [Prisma API kick off](https://www.slideshare.net/TaeSeongPark2/prisma-api-kick-off-reactnative-seoul-meetup)


## Prisma QuickStart
1. $ npm install -g prisma
2. $ prisma init
   1. choose you want to configure (to local/to remote)
   2. choose what database do you want to configure
3. $ docker-compose up -d
4. $ prisma deploy
5. $ prisma playground


## Prisma Playground(GraphQL) Examples
- **Queries**
  - [Prerequisite: Queries](./graphql_example/queries_prerequisite.graphql)
  - [Queries](./graphql_example/queries.graphql)
- **Mutations**
  - [Mutations](./graphql_example/mutations.graphql)
- **Subscriptions**
  - [Prerequisite: Subscriptions](./graphql_example/subscriptions_mutations.graphql)
  - [Subscriptions](./graphql_example/subscriptions.graphql)

#### API Usage
> If you want to really test that node API, you have to set the default datamodel in basic prisma tutorial [here](https://www.prisma.io/docs/prisma-graphql-api/reference/concepts-vw4d/).
> 
> You can get prisma token $ prisma token
- **fetch**
  ```
  $ node api/api_fetch.js [username] [email] [post(single node)] [prisma token]
    ex) node api/api_fetch.js prismaTest test@prisma.io '{"title":"hello prisma!", "published":false}' [prisma token]
  ```
- **graphql-client**
  ```
  $ node api/api_graphql-client.js [username] [email] [post(single node)] [prisma token]
    ex) node api/api_fetch.js prismaTest test@prisma.io '{"title":"hello prisma!", "published":false}' [prisma token]
  ```
- **graphql-request**
  - `graphql-request` does not support passing headers to the request yet
  - so if you want to test, delete `secret:` property in `prisma.yml` and restart prisma.
  ```
  $ node api/api_graphql-request.js [username] [email] [post(single node)]
    ex) node api/api_fetch.js prismaTest test@prisma.io '{"title":"hello prisma!", "published":false}'
  ```
- **apollo**
  - test failed.

### Errors I saw
- `Could not connect to websocket endpoint ws://localhost:4466. Please check if the endpoint url is correct.`
  - [Now on issue](https://github.com/prisma/graphql-playground/issues/853)

