import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

// Load Todos
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction('[Todo] Load Todos Success', props<{ todos: Todo[] }>());
export const loadTodosFailure = createAction('[Todo] Load Todos Failure', props<{ error: string }>());

// Add Todo
export const addTodo = createAction('[Todo] Add Todo', props<{ todo: Todo }>());
export const addTodoSuccess = createAction('[Todo] Add Todo Success', props<{ todo: Todo }>());
export const addTodoFailure = createAction('[Todo] Add Todo Failure', props<{ error: string }>());

// Remove Todo
export const removeTodo = createAction('[Todo] Remove Todo', props<{ id: number }>());
export const removeTodoSuccess = createAction('[Todo] Remove Todo Success', props<{ id: number }>());
export const removeTodoFailure = createAction('[Todo] Remove Todo Failure', props<{ error: string }>());

// Toggle Todo Completion
export const toggleTodo = createAction('[Todo] Toggle Todo', props<{ id: number }>());
export const toggleTodoSuccess = createAction('[Todo] Toggle Todo Success', props<{ id: number }>());
export const toggleTodoFailure = createAction('[Todo] Toggle Todo Failure', props<{ error: string }>());
