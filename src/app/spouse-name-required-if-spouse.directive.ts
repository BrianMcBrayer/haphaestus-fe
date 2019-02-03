import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
import { Employee } from './employee';

@Directive({
  selector: '[appSpouseNameRequiredIfSpouse]',
  providers: [{provide: NG_VALIDATORS, useExisting: SpouseNameRequiredIfSpouseDirective, multi: true}]
})
export class SpouseNameRequiredIfSpouseDirective implements Validator {
  @Input() employee: Employee;

  validate(control: AbstractControl): {[key: string]: any} | null {
    if (this.employee != null) {
      return spouseNameRequiredIfSpouseValidator(this.employee);
    }

    return null;
  }

  constructor() { }

}

export function spouseNameRequiredIfSpouseValidator(employee: Employee): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isValid =  employee.isSpouseEnabled && (control.value != null);
    return isValid ? {'spouseNameRequiredIfSpouse': {value: control.value}} : null;
  };
}
