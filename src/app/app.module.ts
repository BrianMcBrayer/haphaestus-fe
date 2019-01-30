import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material";
import { MatDividerModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { EmployeesComponent } from "./employees/employees.component";

@NgModule({
  declarations: [AppComponent, EmployeesComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatCardModule, MatDividerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
