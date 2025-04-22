import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    profileForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.profileForm = this.createProfileForm();
    }

    ngOnInit(): void {}

    getControl(controlName: string) {
        return this.profileForm.get(controlName)!;
    }

    createProfileForm() {
        return this.fb.group({
            name: ['', [Validators.required, Validators.minLength(4)]],
            email: ['', Validators.required],
            mobile: ['', Validators.required],
            age: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.profileForm.valid) {
            console.log(this.profileForm.value);
        }
    }
}
