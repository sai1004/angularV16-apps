import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TodoActions from '../../state/todo.actions';
import { Todo } from 'src/app/models/todo';
import { selectLoadAllTodos } from 'src/app/state/todo.selectors';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
    todos$: Observable<Todo[]>;
    newTodoTitle: any;

    constructor(private store: Store) {
        this.todos$ = store.select(selectLoadAllTodos);
    }

    ngOnInit(): void {
        this.store.dispatch(TodoActions.loadTodos());
    }

    addTodo() {}

    toggleTodo(id: number) {}

    removeTodo(id: number) {}
}
