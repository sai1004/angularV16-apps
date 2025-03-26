import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

// Load Todos
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction('[Todo] Load Todos Success', props<{ todos: Todo[] }>());
export const loadTodosFailure = createAction('[Todo] Load Todos Failure', props<{ error: string }>());

// Add Todo

// Remove Todo

// Toggle Todo Completion
