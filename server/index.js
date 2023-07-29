// Imports
const express = require('express');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const {GraphQLSchema} = require('graphql');

// Create App
const app = express();

// Create Schema
const schema = new GraphQLSchema({});

// Set up middleware
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening on port 4000');
});