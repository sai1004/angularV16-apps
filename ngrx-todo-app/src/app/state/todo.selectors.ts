import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoState } from './todo.state';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectLoadAllTodos = createSelector(selectTodoState, (state) => state.todos);
