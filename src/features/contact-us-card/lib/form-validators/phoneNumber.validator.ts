import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneNumberValidator(
    control: AbstractControl<unknown, unknown>,
): ValidationErrors | null {
    const phoneNumber = control.value;
    const regExp = /^[0-9]+$/;

    if (!regExp.test(String(phoneNumber))) {
        return { invalidPhoneNumber: true };
    }

    return null;
}
