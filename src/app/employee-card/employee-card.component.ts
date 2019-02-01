import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeViewModel } from '../employee-view-model';
import { Employee } from '../employee';
import { SalaryComputationsService } from '../salary-computations.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {
  private _employee: Employee;
  viewModel: EmployeeViewModel;

  @Input() set employee(value: Employee) {
    this._employee = value;
    this.viewModel = {
      employee: value,
      salary: this.salaryComputationsService.getAnnualSalaryForEmployee(value)
    };
  }
  get employee(): Employee {
    return this._employee;
  }

  @Output() employeeSelectedForEdit = new EventEmitter<Employee>();

  constructor(private salaryComputationsService: SalaryComputationsService) {}

  ngOnInit() {  }

  editEmployee(): void {
    this.employeeSelectedForEdit.emit(this.employee);
  }

}
