import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

    constructor(private http: HttpClient) {}

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl);
    }

    addTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, todo);
    }

    deleteTodo(id: number): Observable<void> {
        console.log(" delete ID >>", id)
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    toggleTodo(id: number): Observable<Todo> {
        console.log(" toggleTodo ID >>", id)
        return this.http.patch<Todo>(`${this.apiUrl}/${id}`, { completed: true });
    }
}
