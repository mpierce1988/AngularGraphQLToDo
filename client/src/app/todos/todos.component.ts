// Angular Core modules
import { Component, OnInit } from '@angular/core';
// Form modules for reactive forms
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Apollo client for GraphQL
import { Apollo } from 'apollo-angular';
// Graph QL queries and mutations
import { ADD_TODO, GET_TODOS, DELETE_TODO } from '../graphql/graphql.queries';

// Component metadata
@Component({
  selector: 'app-todos', // tag name to sue this component in HTML templates
  templateUrl: './todos.component.html', // HTML template associated with this component
  styleUrls: ['./todos.component.css' ] // CSS styles associated with this component
})
export class TodosComponent implements OnInit {
  todos: any[] = []; // array to hold todos
  error: any[] = []; // array to hold errors

  // Reactive form to capture todo details
  todoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  // Constructor injection: Apollo client for GraphQL
  constructor(private apollo: Apollo) {
    
  }

  // Lifecycle hook that is called after data-bound properties of a directive are initialized
  ngOnInit(): void {
      // query to get todos
      // watchQuery returns an observable that updates with the data whenever the underlying data changes in local Apollo cache
      this.apollo.watchQuery({
        query: GET_TODOS
      }).valueChanges.subscribe(({data, error}: any) => { // valueChanges tracks changes over time, provides reaction to changes in data in local Apollo cache
        this.todos = data.todos;
        this.error = error;
      });
  }

  // Method to add Todo using GraphQL mutation
  addTodo() {
    // appolo graphql query to add todo
    this.apollo.mutate({
      mutation: ADD_TODO,
      variables: {
        name: this.todoForm.value.name,
        description: this.todoForm.value.description,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe({
      next: ({data}: any) => {
        this.todos = data.addToDo;
        this.todoForm.reset();
      },
      error: (error) => {
        this.error = error;
      }
    });
  };

  // Method to delete a todo using GraphQL mutation
  deleteTodo(id: string) {
    // query to delete todo
    this.apollo.mutate({
      mutation: DELETE_TODO,
      variables: {
        id: id,
      },
      // After deleting a todo, refetch the list of todos
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe({
      next: ({data} : any) => {
        this.todos = data.addToDo;
        this.todoForm.reset();
      },
      error: (error) => {
        this.error = error;
      }
    }); 
  }

}
