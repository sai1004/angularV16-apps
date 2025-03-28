import { createReducer, on } from '@ngrx/store';
import * as TodoActions from '../state/todo.actions';
import { initialState } from './todo.state';

export const todoReducer = createReducer(
    initialState,

    // Load Todos
    on(TodoActions.loadTodos, (state) => ({ ...state, loading: true })),
    on(TodoActions.loadTodosSuccess, (state, { todos }) => ({ ...state, todos, loading: false })),
    on(TodoActions.loadTodosFailure, (state, { error }) => ({ ...state, error, loading: false })),

    // Add Todo
    // 🚀 Previous state is used to update the new state
    on(TodoActions.addTodo, (state) => ({ ...state, loading: true })),
    on(TodoActions.addTodoSuccess, (state, { todo }) => ({
        ...state, // Keeps other state properties unchanged
        todo, 
        loading: false,
    })),
    on(TodoActions.addTodoFailure, (state, { error }) => ({ ...state, error, loading: false })),

    // Remove Todo
    on(TodoActions.removeTodo, (state) => ({ ...state, loading: true })),
    on(TodoActions.removeTodoSuccess, (state, { id }) => ({ ...state, id, loading: false })),
    on(TodoActions.removeTodoFailure, (state, { error }) => ({ ...state, error, loading: false })),

    // Toggle Todo Completion
    on(TodoActions.toggleTodo, (state) => ({ ...state, loading: true })),
    on(TodoActions.toggleTodoSuccess, (state, { id }) => ({
        ...state,
        todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)), // Uses previous state's `state.todos`
        loading: false,
    })),
    on(TodoActions.toggleTodoFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
