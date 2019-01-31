import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { SalaryComputationsService } from '../salary-computations.service';
import { EmployeeViewModel } from '../employee-view-model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: EmployeeViewModel[];

  constructor(
    private employeeService: EmployeeService,
    private salaryComputationsService: SalaryComputationsService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    const employeeModels = this.employeeService.getEmployees();

    this.employees = employeeModels.map(model => {
       return {
         employee: model,
         salary: this.salaryComputationsService.getAnnualSalaryForEmployee(model) };
      });
  }

}
