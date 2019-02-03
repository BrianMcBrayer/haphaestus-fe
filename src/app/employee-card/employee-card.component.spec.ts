import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material';

import { EmployeeCardComponent } from './employee-card.component';
import { Employee } from '../employee';
import { PersonName } from '../person-name';
import { SalaryComputationsService } from '../salary-computations.service';
import { SalaryInformation } from '../salary-information';
import { By } from '@angular/platform-browser';

describe('EmployeeCardComponent', () => {
  let component: EmployeeCardComponent;
  let fixture: ComponentFixture<EmployeeCardComponent>;

  const defaultEmployee = new Employee(
    1,
    new PersonName('Sam', 'McLoughlin'),
    new PersonName('Alex', 'McLoughlin'),
    true,
    [
      new PersonName('Krystal', 'McLoughlin'),
      new PersonName('Eric', 'McLoughlin')
    ]);

  const defaultSalaryInformation = <SalaryInformation>{
    annualDeduction: 500,
    annualGrossSalary: 600,
    annualNetSalary: 700,
    payPeriodsPerYear: 800,
    paycheckDeduction: 900,
    paycheckGrossSalary: 1000,
    paycheckNetSalary: 1100
  };

  let salaryComputationsServiceStub: Partial<SalaryComputationsService>;

  salaryComputationsServiceStub = {
    getAnnualSalaryForEmployee(employee: Employee): SalaryInformation {
       return defaultSalaryInformation;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
      ],
      declarations: [ EmployeeCardComponent ],
      providers: [{provide: SalaryComputationsService, useValue: salaryComputationsServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCardComponent);
    component = fixture.componentInstance;
    component.employee = defaultEmployee;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct name', () => {
    const cardElement: HTMLElement = fixture.nativeElement;
    const renderedEmployeeName = cardElement.querySelector('.employee-name');
    expect(renderedEmployeeName.textContent).toBe('McLoughlin, Sam');
  });

  it('should display correct dependent count', () => {
    const cardElement: HTMLElement = fixture.nativeElement;
    const renderedEmployeeName = cardElement.querySelector('.dependents');
    expect(renderedEmployeeName.textContent).toMatch(/^\s*2.*?$/);
  });

  it('should display correct salary', () => {
    const cardElement: HTMLElement = fixture.nativeElement;
    const renderedSalary = cardElement.querySelector('.salary-table tr:nth-child(1) td:nth-child(2)');
    expect(renderedSalary.textContent).toBe('$600.00');
  });

  it('should display correct deduction', () => {
    const cardElement: HTMLElement = fixture.nativeElement;
    const renderedDeduction = cardElement.querySelector('.salary-table tr:nth-child(2) td:nth-child(2)');
    expect(renderedDeduction.textContent).toBe('$500.00');
  });

  it('should display correct net salary', () => {
    const cardElement: HTMLElement = fixture.nativeElement;
    const renderedNetSalary = cardElement.querySelector('.salary-table tr:nth-child(3) td:nth-child(2)');
    expect(renderedNetSalary.textContent).toBe('$700.00');
  });

  it('should emit employee selected for edit when clicked', () => {
    let emittedEmployee: Employee;
    component.employeeSelectedForEdit.subscribe((employee: Employee) => emittedEmployee = employee);

    fixture.debugElement.query(By.css('.employee')).triggerEventHandler('click', null);
    expect(emittedEmployee).toBe(defaultEmployee);
  });
});
