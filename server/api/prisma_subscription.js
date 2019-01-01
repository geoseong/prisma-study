const { prisma } = require('../generated/prisma-client')
const { GraphQLServer, PubSub } = require('graphql-yoga')

const resolvers = {
  Query: {
    post(root, args, context) {
      return context.prisma.post({ id: args.where.id })
    },
  },
  Mutation: {
    createPost(root, args, context) {
      return context.prisma.createPost(
        {
          title: args.data.title,
          published: args.data.published,
        },
      )
    },
    updatePost(root, args, context) {
      const { data: { title, published, author }, where: { id }} = args
      let whereObj = {}
      return context.prisma.updatePost(
        {
          where: { id },
          data: { title, published, author },
        },
      )
    },
    deletePost(root, args, context) {
      console.log({args})
      return context.prisma.deletePost(
        { id: args.where.id }
      )
    },
  },
  Subscription: {
    post: {
      subscribe: async (parent, args, context) => {
        return context.prisma.$subscribe
          .post({
            mutation_in: ['CREATED', 'UPDATED'],
          })
          .node()
      },
      resolve: payload => {
        console.log({payload})
        /* payload must be same structure as return scheme of mutation and return scheme of subscription in client app */
        return {
          node: payload
        }
      },
    },
    // post: {
    //   subscribe: (parent, args, { prisma, pubsub }) => {
    //     const channel = Math.random().toString(36).substring(2, 15) // random channel name
    //     let count = 0
    //     setInterval(() => pubsub.publish(
    //         channel, 
    //         prisma.$subscribe.post({
    //           mutation_in: ['CREATED', 'UPDATED'],
    //         }).node()
    //       )
    //     , 2000)
    //     return pubsub.asyncIterator(channel)
    //   },
    //   resolve: (payload, args, context, info) => {
    //     // Manipulate and return the new value
    //     console.log({payload})
    //     return payload.somethingChanged;
    //   },
    // }
  },
}
const pubsub = new PubSub()
const server = new GraphQLServer({
  typeDefs: 'generated/prisma-study.graphql',
  resolvers,
  context: {
    prisma,
    pubsub,
  },
})
server.start({
  subscriptions: '/subscription',
  playground: '/playground'
},
(props) => {
  console.log({props})
  console.log(`Server is running on http://localhost:${props.port}`)
})