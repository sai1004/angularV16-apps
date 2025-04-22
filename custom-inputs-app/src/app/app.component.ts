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

    ngOnInit(): void {
        
    }

    get emailControl(): FormControl {
        return this.form.get('email') as FormControl;
    }

    get ageControl(): FormControl {
        return this.form.get('age') as FormControl;
    }

    // https://timdeschryver.dev/blog/working-with-angular-forms-in-an-enterprise-environment
    // https://coryrylan.com/blog/building-reusable-forms-in-angular
}
