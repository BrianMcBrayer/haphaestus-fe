import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { AddEditEmployeeOptions } from '../add-edit-employee/add-edit-employee-options';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { MatDialog } from '@angular/material';
import { Employee } from '../employee';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getEmployees();

    setTimeout(() => {
      this.route.paramMap.subscribe(params => {
        if (params.has('employeeId')) {
          this.showEmployee(+params.get('employeeId'));
        }
      });
    });
  }

  filterChanged(value: string): void {
    this.employeeService.getEmployees().then((employees) => this.employees = employees.filter((employee) => {
      const matcher = new RegExp(value, 'i');
      return matcher.test(employee.name.firstName) || matcher.test(employee.name.lastName);
    }));
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .then((employees) => this.employees = employees);
  }

  onEmployeeSelectedForEdit(employee: Employee): void {
    const existingId = +this.route.snapshot.paramMap.get('employeeId');
    if (existingId !== employee.id) {
      this.router.navigate([`/employees/${employee.id}`]);
    } else {
      this.showEmployee(existingId);
    }
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(AddEditEmployeeComponent, {
      data: <AddEditEmployeeOptions>{
        employee: new Employee(),
        isAdding: true
      }
    });

    dialogRef.afterClosed().subscribe((newEmployee) => {
      if (newEmployee != null) {
        this.saveEmployee(newEmployee, true);
      }
    });
  }

  showEmployee(employeeId: number): void {
    const employee = this.employeeService.getEmployee(employeeId);

    const dialogRef = this.dialog.open(AddEditEmployeeComponent, {
      data: <AddEditEmployeeOptions>{
        employee: employee,
        isAdding: false
      }
    });

    dialogRef.afterClosed().subscribe((newEmployee) => {
      if (newEmployee != null) {
        this.saveEmployee(newEmployee, false);
      }
    });
  }

  private async saveEmployee(employee: Employee, isNew: boolean): Promise<void> {
    await this.employeeService.saveEmployee(employee);

    this.employeeService.getEmployees().then((refreshedEmployees) => this.employees = refreshedEmployees);
  }

}
