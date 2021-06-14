const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const db = require('./db/index')
const path = require('path')

const PORT = process.env.PORT || 3001

const graphQLSchema = require('./graphql/schema/index')
const graphQLResolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/index')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(isAuth)

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQLSchema, //point at schema
    rootValue: graphQLResolvers //point at object that has all resolver functions in it
  })
)

db.on('error', console.error.bind(console, 'MongoDB connection error: '))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/frontend/build/index.html`))
  })
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
