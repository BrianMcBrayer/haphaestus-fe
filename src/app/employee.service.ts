import { Injectable } from '@angular/core';
import { EMPLOYEES } from './mock-employees';
import { Employee } from './employee';
import { SalaryComputationsService } from './salary-computations.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor() {}

  async getEmployees(): Promise<Employee[]> {
    const employees = [...EMPLOYEES];

    this.sortEmployees(employees);

    return employees;
  }

  getEmployee(employeeId: number): Employee {
    const foundEmployees = EMPLOYEES.filter((employee) => employee.id === employeeId);
    if (foundEmployees.length === 1) {
      return foundEmployees[0];
    }

    if (foundEmployees.length > 1) {
      throw new Error(`Found more than one employee matching Id ${employeeId}`);
    }

    throw new Error(`Found no employee matching Id ${employeeId}`);
  }

  async saveEmployee(employee: Employee): Promise<void> {
    if (employee.id !== null) { // this is an existing employee
      // for now, just simulate saving this employee
      for (let index = 0; index < EMPLOYEES.length; index++) {
        if (EMPLOYEES[index].id === employee.id) {
          EMPLOYEES[index] = { ...employee };
          break;
        }
      }
    } else {
      // this is a new employee
      employee.id = Math.round(Math.random() * 1000000000);
      EMPLOYEES.push(employee);
    }
  }

  private sortEmployees(employees: Employee[]): void {
    employees.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName));
  }
}
