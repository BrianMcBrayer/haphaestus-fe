import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import CONFIG from './config';

/**
 * Provides ability to get, add, and update employees
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[];
  private hasFetchedEver = false;

  /**
   * Constructor for EmployeeService
   * @param http The HttpClient used to make network calls
   */
  constructor(private http: HttpClient) {}

  /**
   * Reloads the cached employee array
   */
  async refreshEmployees(): Promise<void> {
    await this.http.get<Employee[]>(`${CONFIG.BaseUrl}/GetEmployees`)
      .toPromise()
      .then((data: Employee[]) => {
        this.employees = data;
      });
  }

  /**
   * Returns the array of employees
   */
  async getEmployees(): Promise<Employee[]> {
    if (!this.hasFetchedEver) {
      await this.refreshEmployees();

      this.hasFetchedEver = true;
    }

    return this.employees;
  }

  /**
   * Returns a single employee matching employeeId. Throws an error if no employees match employeeIdentifier.
   * @param employeeId The employee identifier
   */
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

  /**
   * Inserts or updates employee
   * @param employee The employee to save
   */
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
}
