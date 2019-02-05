import { Employee } from './employee';
import { SalaryInformation } from './salary-information';

/**
 * Holds employee view model information
 */
export class EmployeeViewModel {
    /**
     * The employee
     */
    employee: Employee;

    /**
     * The employee's salary information
     */
    salary: SalaryInformation;
}
