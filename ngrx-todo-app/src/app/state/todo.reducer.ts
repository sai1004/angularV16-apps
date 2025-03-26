import { createReducer, on } from '@ngrx/store';
import * as TodoActions from '../state/todo.actions';
import { initialState } from './todo.state';

export const todoReducer = createReducer(
    initialState,
    // Load Todos
    on(TodoActions.loadTodos, (state) => ({ ...state, loading: true })),
    on(TodoActions.loadTodosSuccess, (state, { todos }) => ({ ...state, todos, loading: false })),
    on(TodoActions.loadTodosFailure, (state, { error }) => ({ ...state, error, loading: false }))

    // Add Todo

    // Remove Todo

    // Toggle Todo Completion
);
