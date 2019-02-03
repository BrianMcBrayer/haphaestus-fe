import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';
import { MatDividerModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';

import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpouseNameRequiredIfSpouseDirective } from './spouse-name-required-if-spouse.directive';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeCardComponent,
    AddEditEmployeeComponent,
    PageNotFoundComponent,
    SpouseNameRequiredIfSpouseDirective],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddEditEmployeeComponent]
})
export class AppModule {}
