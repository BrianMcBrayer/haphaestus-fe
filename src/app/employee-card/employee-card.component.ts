import { Component, OnInit, Input } from '@angular/core';
import { EmployeeViewModel } from '../employee-view-model';
import { MatDialog } from '@angular/material';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { AddEditEmployeeOptions } from '../add-edit-employee/add-edit-employee-options';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: EmployeeViewModel;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  editEmployee(): void {
    const dialogRef = this.dialog.open(AddEditEmployeeComponent, {
      data: <AddEditEmployeeOptions> { employee: this.employee.employee, isAdding: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
