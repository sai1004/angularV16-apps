import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../services/todo.service';
import * as TodoActions from './todo.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TodoEffects {
    constructor(private actions$: Actions, private todoService: TodoService) {}

    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.loadTodos),
            mergeMap(() =>
                this.todoService.getTodos().pipe(
                    map((todos) => TodoActions.loadTodosSuccess({ todos })),
                    catchError((error) => of(TodoActions.loadTodosFailure({ error })))
                )
            )
        )
    );

    addTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.addTodo),
            mergeMap((action) =>
                this.todoService.addTodo(action.todo).pipe(
                    map((todo) => TodoActions.addTodoSuccess({ todo })),
                    catchError((error) => of(TodoActions.addTodoFailure({ error })))
                )
            )
        )
    );

    removeTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.removeTodo),
            mergeMap((action) =>
                this.todoService.deleteTodo(action.id).pipe(
                    map(() => TodoActions.removeTodoSuccess({ id: action.id })),
                    catchError((error) => of(TodoActions.removeTodoFailure({ error })))
                )
            )
        )
    );

    toggleTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.toggleTodo),
            mergeMap((action) =>
                this.todoService.toggleTodo(action.id).pipe(
                    map(() => TodoActions.toggleTodoSuccess({ id: action.id })),
                    catchError((error) => of(TodoActions.toggleTodoFailure({ error })))
                )
            )
        )
    );
}
