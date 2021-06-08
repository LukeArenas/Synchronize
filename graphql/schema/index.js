const { buildSchema } = require('graphql')

module.exports = buildSchema(`

  type Event {
    _id: ID!
    title: String!
    details: String!
    location: String!
    date: String!
    owner: User!
  }

  type User {
    _id: ID!
    username: String!
    password: String
    createdEvents: [Event!]
  }

  type AuthData {
    userId: ID!
    token: String!
  }

  input EventInput {
    title: String!
    details: String!
    location: String!
    date: String!
  }

  input UserInput {
    username: String!
    password: String!
  }

  type RootQuery {
    events: [Event!]!
    login(username: String!, password: String!): AuthData!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }

`)
