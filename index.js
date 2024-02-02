require("dotenv/config");
const { ApolloServer } = require("apollo-server");

const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");

const mongoDB = process.env.CONNECTION_STRING;

const typeDefs = require("./graphQL/typeDefs.js");
const resolvers = require("./graphQL/resolvers.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("Database is connected"); 
    return server.listen({ port: 4001 });
  })
  .then((res) => {
    console.log(`Server is running on ${res.url}`);
  })

  .catch((err) => {
    console.error(err);
  });
