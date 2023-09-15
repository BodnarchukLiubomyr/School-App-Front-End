import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenDomain(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? { forbiddenDomain: { value: control.value } } : null;
    };
}
