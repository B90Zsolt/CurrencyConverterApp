import { AbstractControl, Form, FormControl } from "@angular/forms";

export class PasswordValidator {
    public static strong(control: FormControl) {
      const hasNumber = /\d/.test(control.value);
      const hasUpper = /[A-Z]/.test(control.value);
      if (!(hasNumber && hasUpper)) {
        return { strong: true };
      }
      return null;
    }
  }
  
export function equalsValidator(otherControlName: string) {
  let thisControl: FormControl;
  let otherControl: FormControl;

  return function equalsValidate(control: FormControl) {
    if (!control.parent) {
      return null;
    }

    if (!thisControl) {
      thisControl = control;
      otherControl = control.parent.get(otherControlName) as FormControl;
      if (!otherControl) {
        throw new Error(
          'equalsValidator(): other control is not found in parent group'
        );
      }
      otherControl.valueChanges.subscribe(() => {
        thisControl.updateValueAndValidity();
      });
    }

    if (!otherControl) {
      return null;
    }

    if (otherControl.value !== thisControl.value) {
      return {
        equals: true
      };
    }

    return null;
  };
}

export function hasError(control: AbstractControl | undefined | null) : Boolean {
  if(!control)
    return true;

  return !control.valid && control.dirty;
}

export function getErrorMsg(control: AbstractControl | undefined | null) : string | undefined{
  if(!control || !control.errors)
    return undefined;

  switch(Object.keys(control.errors)[0]) {
    case 'email':
      return 'Érvénytelen email cím';
    case 'minlength':
      return 'Nem elég hosszú';
    case 'strong':
      return 'Legalább egy számot és egy nagybetűt kell tartalmaznia';
    case 'required':
      return 'Kötelező mező';
    case 'equals': 
      return 'Két jelszó nem egyezik meg';

    default:
      return 'Hibás adat'
  }
}