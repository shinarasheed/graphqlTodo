const express = require('express');
//we need this to create the graphql server
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/Schema');
const connectToDB = require('./db');

const app = express();

//connect ot db
connectToDB();

//the single endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 7000;

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});
