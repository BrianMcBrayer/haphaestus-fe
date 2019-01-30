import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryComputationsService {

  constructor() { }

  getAnnualSalaryForEmployee(employeeId: string): number {
    return 2000 * 26; // TODO Make these numbers configurable
  }
}
