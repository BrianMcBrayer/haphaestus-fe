import { Injectable } from '@angular/core';
import { EMPLOYEES } from './mock-employees';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  getEmployees(): Employee[] {
    return EMPLOYEES;
  }
}
