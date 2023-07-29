// Imports
const express = require('express');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString} = require('graphql');

// Create App
const app = express();

// Create Two Todos with id, name, and description
const Todos = [
    { id: 1, name: 'Read that book', description: 'Read that book about GraphQL' },
    { id: 2, name: 'Complete Assignment', description: 'Complete that assignment' }
];

// Create GraqphQlObjectType
const TodoType = new GraphQLObjectType({
    name: 'Todo',
    description: 'This is a todo',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt)},
        name: { type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)}
    })
});

// Create Queries for Todos
// Method to fetch all todos, and a method to fetch a single todo
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        todos: {
            type: new GraphQLList(TodoType),
            description: 'List of All Todos',
            resolve: () => Todos
        },
        todo: {
            type: TodoType,
            description: 'A Single Todo',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (root, args) => { return Todos.find(todo => todo.id === args.id )}
        }
    })
});

// Create Mutations for Todos
// Mutations are used to create, update, and delete data
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addTodo: {
            type: TodoType,
            description: 'Add a Todo',
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                description: {
                    type: GraphQLNonNull(GraphQLString)
                },
            },
            resolve: (root, args) => {
                // Create new todo
                const newToDo = {
                    id: Todos.length + 1,
                    name: args.name,
                    description: args.description
                }
                // Add to array of Todos. Alternatively, you can add to a database
                Todos.push(newToDo);
                // return the new todo
                return newToDo;
            }
        },
        deleteTodo: {
            type: TodoType,
            description: 'Delete a Todo',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (root, args) => {
                const todo = Todos.find(todo => todo.id === args.id);

                if (todo){
                    Todos.splice(Todos.indexOf(todo), 1);
                    return todo;
                }
                return null;
            }
        }
        
    })
});

// Create Schema
const schema = new GraphQLSchema({
    query: RootQueryType
});

// Set up middleware
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening on port 4000');
});