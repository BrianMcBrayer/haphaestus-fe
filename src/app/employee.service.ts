import { Injectable } from '@angular/core';
import { EMPLOYEES } from './mock-employees';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import CONFIG from './config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[];
  private hasFetchedEver = false;

  constructor(private http: HttpClient) {}

  async refreshEmployees(): Promise<void> {
    await this.http.get<Employee[]>(`${CONFIG.BaseUrl}/GetEmployees`)
      .toPromise()
      .then((data: Employee[]) => {
        this.employees = data;
      });

    // const employees = [...EMPLOYEES];

    // this.sortEmployees(employees);

    // this.employees = employees;
  }

  async getEmployees(): Promise<Employee[]> {
    if (!this.hasFetchedEver) {
      await this.refreshEmployees();

      this.hasFetchedEver = true;
    }

    return this.employees;
  }

  getEmployee(employeeId: number): Employee {
    const foundEmployees = this.employees.filter((employee) => employee.id === employeeId);
    if (foundEmployees.length === 1) {
      return foundEmployees[0];
    }

    if (foundEmployees.length > 1) {
      throw new Error(`Found more than one employee matching Id ${employeeId}`);
    }

    throw new Error(`Found no employee matching Id ${employeeId}`);
  }

  async saveEmployee(employee: Employee): Promise<Employee> {
    if (employee.id !== null) { // this is an existing employee
      return await this.http.post<Employee>(`${CONFIG.BaseUrl}/UpdateEmployee`, employee)
        .toPromise()
        .then(async (data: Employee) => {
          await this.refreshEmployees();

          return data;
        });
    } else {
      // this is a new employee

      return await this.http.post<Employee>(`${CONFIG.BaseUrl}/AddEmployee`, employee)
        .toPromise()
        .then(async (data: Employee) => {
          await this.refreshEmployees();

          return data;
        });
    }
  }

  private sortEmployees(employees: Employee[]): void {
    employees.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName));
  }
}
