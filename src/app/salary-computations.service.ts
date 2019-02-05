import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { SalaryInformation } from './salary-information';
import { PersonName } from './person-name';

/**
 * Calculates salary information
 */
@Injectable({
  providedIn: 'root'
})
export class SalaryComputationsService {
  // ITERATION make these numbers configurable
  readonly payPeriodsPerYear: number = 26;
  readonly salaryPerPaycheck: number = 2000;
  readonly deductionPerDependent: number = 500;
  readonly deductionPerEmployee: number = 1000;
  readonly deductionPercent: number = 0.10;
  readonly discountedFirstCharacter: string = 'a';

  constructor() { }

  /**
   * Calculates paycheck information for the given employee
   * @param employee The employee for which to calculate paycheck information
   */
  getAnnualSalaryForEmployee(employee: Employee): SalaryInformation {
    const annualDeduction = this.getTotalAnnualDeductionForEmployee(employee);
    const annualGrossSalary = this.payPeriodsPerYear * this.salaryPerPaycheck;
    const annualNetSalary = annualGrossSalary - annualDeduction;

    return {
      annualDeduction,
      annualGrossSalary,
      annualNetSalary,

      paycheckDeduction: this.scaleAnnualToSinglePaycheck(annualDeduction),
      paycheckGrossSalary: this.scaleAnnualToSinglePaycheck(annualGrossSalary),
      paycheckNetSalary: this.scaleAnnualToSinglePaycheck(annualNetSalary),

      payPeriodsPerYear: this.payPeriodsPerYear
    };
  }

  /**
   * Calculates the annual deduction for a person
   * @param person The PersonName for which to calculate the annual deduction
   * @param isDependent Boolean flag to indicate whether person is a dependent (affects the deduction amount)
   */
  getAnnualDeductionForPerson(person: PersonName, isDependent: boolean): number {
    const hasDiscount = this.personNameGetsDiscount(person);
    const rawDeduction = isDependent ? this.deductionPerDependent : this.deductionPerEmployee;

    return hasDiscount ? rawDeduction - (this.deductionPercent * rawDeduction) : rawDeduction;
  }

  private scaleAnnualToSinglePaycheck(value: number): number {
    return value / this.payPeriodsPerYear;
  }

  private getTotalAnnualDeductionForEmployee(employee: Employee): number {
    const employeeDeduction = this.getAnnualDeductionForPerson(employee.name, false);
    const spouseDeduction = employee.isSpouseEnabled ? this.getAnnualDeductionForPerson(employee.spouse, true) : 0;
    const otherDependentDeduction = employee.dependents.reduce((prev, cur) => prev + this.getAnnualDeductionForPerson(cur, true), 0);

    return employeeDeduction + spouseDeduction + otherDependentDeduction;
  }

  private personNameGetsDiscount(person: PersonName): boolean {
    return (person.firstName.toLocaleLowerCase().startsWith(this.discountedFirstCharacter)
            || person.lastName.toLocaleLowerCase().startsWith(this.discountedFirstCharacter));
  }
}
