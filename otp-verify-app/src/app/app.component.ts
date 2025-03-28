import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    email: FormControl;
    isEmailTemplate: boolean = true;
    otpForm: FormGroup;
    otpPin: number = 0;
    otpValidators: any = [Validators.required, Validators.min(1), Validators.max(1), Validators.pattern('^[0-9]*$')];
    errorMessage: string = '';

    @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

    constructor(private fb: FormBuilder) {
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.otpForm = this.createOtpForm();
    }

    ngOnInit(): void {}

    moveFocus(index: number, event: any): void {
        if (event.target.value && index < this.otpInputs.length - 1) {
            this.otpInputs.get(index + 1)?.nativeElement.focus();
        }
    }

    createOtpForm() {
        return this.fb.group({
            pin1: ['', this.otpValidators],
            pin2: ['', this.otpValidators],
            pin3: ['', this.otpValidators],
            pin4: ['', this.otpValidators],
        });
    }

    onNext() {
        if (this.email.valid) {
            this.isEmailTemplate = false;
            this.genrateOtp();
        }
    }

    validateNumberInput(event: KeyboardEvent) {
        const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
        if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
            event.preventDefault(); // Prevent non-numeric input
        }
        this.errorMessage ? (this.errorMessage = '') : '';
    }

    onVerify() {
        if (this.otpForm.valid) {
            let enteredPin = '';
            for (let [key, value] of Object.entries(this.otpForm.value)) {
                enteredPin += value;
            }
            console.log('enteredPin >>', Number(enteredPin));
            if (this.otpPin === Number(enteredPin)) {
                console.log('OTP Mateched & Email Verified!!');
            } else {
                this.errorMessage = 'Invalid pin entered, please enter valid pin';
                this.otpForm.reset();
            }
        }
    }

    genrateOtp() {
        const randomNumber = Math.random() * 9000;
        this.otpPin = Math.floor(1000 + randomNumber);
    }
}
