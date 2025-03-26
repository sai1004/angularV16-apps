import { Todo } from '../models/todo';

export interface TodoState {
    todos: Todo[];
    error: string | null;
    loading: boolean;
}

export const initialState: TodoState = {
    todos: [],
    error: null,
    loading: false,
};
