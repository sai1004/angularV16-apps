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
}
