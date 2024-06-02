const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const routes = require('./routes');
const typeDefs = require('./schema/typeDefs.js');
const resolvers = require('./schema/resolvers.js');
const authMiddleware = require('./utils/auth'); // Import your auth middleware
console.log('TypeDefs:', typeDefs);
console.log('Resolvers:', resolvers);


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
});


async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Use routes
  app.use(routes);

  // Start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}


startServer();
