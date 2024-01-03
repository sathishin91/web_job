// validators/custom-validators.ts
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, catchError } from 'rxjs/operators';

export const customValidator: AsyncValidatorFn = (
  control: AbstractControl
): Observable<ValidationErrors | null> => {
  console.log('Async validator called', control.value);

  const mobileNumberControl = control.get('mobile_number');

  if (
    !mobileNumberControl ||
    !mobileNumberControl.value ||
    mobileNumberControl.value.length !== 10
  ) {
    console.log('invalid in custom validators');
    return of({ invalidMobileNumber: true });
  }

  return of(null);
};
