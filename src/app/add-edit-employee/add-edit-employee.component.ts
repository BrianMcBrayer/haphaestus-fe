import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddEditEmployeeOptions, private salaryComputations: SalaryComputationsService) {
    this.model = {
      id: data.employee.id,
      name: {
        firstName: data.employee.name.firstName,
        lastName: data.employee.name.lastName
      },
      isSpouseEnabled: data.employee.isSpouseEnabled,
      spouse: {
        firstName: data.employee.spouse.firstName,
        lastName: data.employee.spouse.lastName
      },
      dependents: data.employee.dependents.map((dep) => {
        return <PersonName>{ firstName: dep.firstName, lastName: dep.lastName };
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

}
