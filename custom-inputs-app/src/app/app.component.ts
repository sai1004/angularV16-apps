import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mergeMap, of } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]],
            age: ['', [Validators.required, Validators.min(5), Validators.max(50)]],
        });
    }

    // Example: Fetching comments for multiple posts concurrently
    postIds = [1, 2, 3];

    ngOnInit(): void {
        of(...this.postIds)
            .pipe(mergeMap((postId) => this.http.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)))
            .subscribe((comments) => {
                // Handle comments from all posts as they arrive
                console.log(comments);
            });
    }

    get emailControl(): FormControl {
        return this.form.get('email') as FormControl;
    }

    get ageControl(): FormControl {
        return this.form.get('age') as FormControl;
    }
}
