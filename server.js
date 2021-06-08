const express = require('express')
const bodyParser = require('body-parser')
const { graphQLHTTP } = require('express-graphql')
const mongoose = require('mongoose')

const graphQLSchema = require('./graphql/schema/index')

const app = express()

app.use(bodyParser.json())

// app.use('/graphql', graphQLHTTP({
//   schema: graphQLSchema,
//   rootValue: ,
//   graphiql: true
// }))

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@synchronize.bijfb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3001)
  })
  .catch((error) => {
    console.log(error)
  })
