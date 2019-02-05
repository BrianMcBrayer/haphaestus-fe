import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
import { Employee } from './employee';

/**
 * Controls validation that requires a spouse name if the spouse is enabled
 */
@Directive({
  selector: '[appSpouseNameRequiredIfSpouse]',
  providers: [{provide: NG_VALIDATORS, useExisting: SpouseNameRequiredIfSpouseDirective, multi: true}]
})
export class SpouseNameRequiredIfSpouseDirective implements Validator {
  @Input() employee: Employee;

  /**
   * Validates the given control contains a string if the spouse is enabled
   * @param control The control that contains part of the spouse name
   */
  validate(control: AbstractControl): {[key: string]: any} | null {
    if (this.employee != null) {
      return spouseNameRequiredIfSpouseValidator(this.employee);
    }

    return null;
  }

  constructor() { }

}

/**
 * Validates that the given control value contains a string if the employee has a spouse
 * @param employee The employee model to validate
 */
export function spouseNameRequiredIfSpouseValidator(employee: Employee): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isValid =  employee.isSpouseEnabled && (control.value != null);
    return isValid ? {'spouseNameRequiredIfSpouse': {value: control.value}} : null;
  };
}
