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

    // addTodo$ = createEffect(() => this.actions$);

    // removeTodo$ = createEffect(() => this.actions$);

    // toggleTodo$ = createEffect(() => this.actions$);
}
