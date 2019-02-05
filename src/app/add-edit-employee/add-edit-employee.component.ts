import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { AddEditEmployeeOptions } from './add-edit-employee-options';
import { Employee } from '../employee';
import { PersonName } from '../person-name';
import { SalaryComputationsService } from '../salary-computations.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  model: Employee;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddEditEmployeeOptions,
    public dialogRef: MatDialogRef<Employee>,
    private salaryComputations: SalaryComputationsService,
    private snackBar: MatSnackBar) {
    this.model = {
      id: data.employee.id,
      name: new PersonName(data.employee.name.firstName, data.employee.name.lastName),
      isSpouseEnabled: data.employee.isSpouseEnabled,
      spouse: new PersonName(data.employee.spouse.firstName, data.employee.spouse.lastName),
      dependents: data.employee.dependents.map((dep) => {
        return new PersonName(dep.firstName, dep.lastName);
      })
    };
   }

  ngOnInit() {
  }

  addDependent(): void {
    this.model.dependents.push(new PersonName());
  }

  removeDependent(dependentIndex: number): void {
    this.model.dependents.splice(dependentIndex, 1);
  }

  getDeductionForSpouse(): number {
    if (!this.model.isSpouseEnabled) {
      return 0;
    }

    return this.getDeductionForName(this.model.spouse, true);
  }

  getDeductionForName(name: PersonName, isDependent: boolean): number {
    return this.salaryComputations.getAnnualDeductionForPerson(name, isDependent);
  }

  getDependentDeductions(): number {
    return this.model.dependents.reduce((total, currentDependent) => total += this.getDeductionForName(currentDependent, true), 0);
  }

  getTotalDeductions(): number {
    return this.getDeductionForName(this.model.name, false) +
      this.getDeductionForSpouse() +
      this.getDependentDeductions();
  }

  attemptCloseWithChanges(): void {
    if (!this.validateModel()) {
      this.snackBar.open('Please fill in all required names before attempting to save', '', {
        duration: 2000
      });

      return;
    }

    this.dialogRef.close(this.model);
  }

  validateModel(): boolean {
    const employeeIsValid = this.validateName(this.model.name);
    const spouseIsValid = !this.model.isSpouseEnabled || this.validateName(this.model.spouse);
    const depedentsAreValid = !this.model.dependents.some(dependent => !this.validateName(dependent));

    return employeeIsValid &&
      spouseIsValid &&
      depedentsAreValid;
  }

  private validateName(name: PersonName): boolean {
    return this.stringNotNullOrEmpty(name.firstName) &&
      this.stringNotNullOrEmpty(name.lastName);
  }

  private stringNotNullOrEmpty(str: string): boolean {
    return str && str.length > 0;
  }

}
