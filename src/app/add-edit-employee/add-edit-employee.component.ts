import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AddEditEmployeeOptions } from './add-edit-employee-options';
import { Employee } from '../employee';
import { PersonName } from '../personName';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  model: Employee;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddEditEmployeeOptions) {
    if (!data.isAdding) {
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
    } else {
      this.model = new Employee();
    }
   }

  ngOnInit() {
  }

}
