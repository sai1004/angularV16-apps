import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-custom-input',
    templateUrl: './custom-input.component.html',
    styleUrls: ['./custom-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomInputComponent),
            multi: true,
        },
    ],
})
export class CustomInputComponent implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() type: string = 'text';
    @Input() control: FormControl | null = null;

    value: string = '';
    disabled: boolean = false;

    onChange = (value: string) => {};
    onTouched = () => {};

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    handleInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.onChange(this.value);
    }

    markTouched(): void {
        this.onTouched();
    }

    get showErrors(): boolean {
        return !!this.control && this.control.invalid && (this.control.touched || this.control.dirty);
    }

    get errorMessages(): string[] {
        if (!this.control || !this.control.errors) return [];
        return Object.keys(this.control.errors).map((errorKey) => {
            switch (errorKey) {
                case 'required':
                    return 'This field is required.';
                case 'minlength':
                    return `Minimum length is ${this.control?.errors?.['minlength'].requiredLength}.`;
                case 'maxlength':
                    return `Maximum length is ${this.control?.errors?.['maxlength'].requiredLength}.`;
                case 'email':
                    return 'Please enter a valid email. ';
                default:
                    return 'Invalid input.';
            }
        });
    }
}
