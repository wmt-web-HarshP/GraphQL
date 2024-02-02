export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews:[Review!]
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    game:Game!
    author:Author!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews:[Review!]
  }
  type Query { 
    game(id:ID!):Game
    games: [Game]
    review(id:ID!):Review
    reviews: [Review]
    author(id:ID!):Author
    authors: [Author]
  }
  type Mutation {
    deleteGame(id:ID!):[Game]
    addGame(game:addGameInput!):Game
    updateGame(id: ID!, edits: EditGameInput): Game
  }
  input addGameInput {
    title: String!
    platform: [String!]!
  }
  input EditGameInput {
    title: String,
    platform: [String!]
  }
`
