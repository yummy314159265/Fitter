const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const { buildContext } = require('graphql-passport');
// var MongoDBStore = require('connect-mongodb-session')(session);
// const { AuthenticationError } = require('apollo-server-express');

const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// var store = new MongoDBStore({
//   uri: 'mongodb://127.0.0.1:27017/fitnessDB',
//   collection: 'mySessions'
// });

// // Catch errors
// store.on('error', function(error) {
//   console.log(`store error \n-------------------\n`,error);
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(session({
//   secret: 'This is a secret',
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
//   },
//   store: store,
//   resave: true,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);