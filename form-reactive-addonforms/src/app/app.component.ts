import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    get nominations(): FormArray {
        return this.profileForm.get('nominations') as FormArray;
    }

    createProfileForm() {
        return this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            mobile: ['', Validators.required],
            nominations: this.fb.array([]),
        });
    }

    createNominationsForm() {
        return this.fb.group({
            name: ['', Validators.required],
            age: ['', Validators.required],
            email: ['', Validators.required],
            mobile: ['', Validators.required],
            percentage: ['', Validators.required],
        });
    }

    addNominations() {
        this.nominations.push(this.createNominationsForm());
    }

    removeNominations(index: number) {
        this.nominations.removeAt(index);
    }

    onSubmit() {
        console.log(this.profileForm.value);
    }
}
