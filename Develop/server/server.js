const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/typeDefs'); // Assuming you have a 'typeDefs.js' file in the 'schema' directory
const resolvers = require('./schemas/resolvers'); // Assuming you have a 'resolvers.js' file in the 'schema' directory
const { authMiddleware } = require('./utils/auth'); // Corrected import for 'authMiddleware'

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client')); // Updated path to the 'client' directory
});

// Create a new Apollo server and pass in our schema data
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server ${PORT}!`);
      console.log(`GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();