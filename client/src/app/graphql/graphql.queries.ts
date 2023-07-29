import { identifierName } from '@angular/compiler';
import {gql} from 'apollo-angular';

// Create Get Todos Query
// 'query' is the type of request, in this case fetching data
// 'todos' is the field I am querying. Schema defines fields that are available to query
// 'id', 'name', 'description' are the fields I want to return
const GET_TODOS = gql`
    query {
        todos {
            id
            name
            description
        }
    }
`;

// Create Add Todo Mutation query
// 'mutation' is the type of request, in this case adding data
// 'addToDo($name: String!, $description: String!)' is the definition of the mutation and the arguments it takes. ! means required / non-null
// 'addToDo(name: $name, description: $description)' is the actual mutation. $name and $description are the arguments passed in from $name and $description in the definition
// 'id', 'name', 'description' are the fields I want to return. Mutations can return data
const ADD_TODO = gql`
    mutation addToDo($name: String!, $description: String!) {
        addToDo(name: $name, description: $description) {
            id
            name
            description
        }
    }
`;

// Create Delete Todo mutation query
// 'mutation' is the type of request, in this case deleting data
// 'deleteToDo($id: Int!)' is the definition of the mutation and the arguments it takes. ! means required / non-null
// 'deleteToDo(id: $id)' is the actual mutation. $id is the argument passed in from $id in the definition
// 'id' is the field I want to return. Mutations can return data
const DELETE_TODO = gql`
    mutation deleteToDo($id: Int!) {
        deleteToDo(id: $id) {
            id
        }
    }
`;

export { GET_TODOS, ADD_TODO, DELETE_TODO }