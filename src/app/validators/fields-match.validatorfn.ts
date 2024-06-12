import {AbstractControl, ValidationErrors} from "@angular/forms";

export function fieldsMatchValidatorFn(firstFieldName: string, secondFieldName: string, errorKey: string = 'fieldsMismatch') {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const firstFieldControl = formGroup.get(firstFieldName);
        const secondFieldControl = formGroup.get(secondFieldName);

        if (!firstFieldControl || !secondFieldControl) {
            return null;
        }

        if (
            secondFieldControl.errors &&
            !secondFieldControl.errors[errorKey]
        ) {
            return null;
        }

        if (firstFieldControl.value !== secondFieldControl.value) {
            secondFieldControl.setErrors({[errorKey]: true});
            return {[errorKey]: true};
        } else {
            secondFieldControl.setErrors(null);
            return null;
        }
    };
}
