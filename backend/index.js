import express, { json, urlencoded } from 'express'
import { checkMysqlConnection, pool } from './mysql.js'
import { logInfo } from './logger.js'
import {ApolloServer, gql} from 'apollo-server-express'

//    shakes: [Milkshake!]
const typeDefs = gql`
type Query {
   hello:String
}
type Milkshake {
   productId: Int!
   itemName: String!
   itemPrice: Int!
}
`
const resolvers = {
   Query: {
     hello: () => 'Hello world!',
    //  shakes: () => getListOfGuests()
   },
 };


const app = express()
app.use(json())

async function startApolloServer() {
    const apolloServer = new ApolloServer({
         typeDefs,
         resolvers,
     });
     await apolloServer.start();
     apolloServer.applyMiddleware({ app });
  }
  startApolloServer()
  startServer(app)
  
  async function startServer(app) {
     if (await checkMysqlConnection()) {
        app.listen(3000, () => {
           const message = `Server started, listening at port 3000`
           console.log(message)
        })
     }
  }