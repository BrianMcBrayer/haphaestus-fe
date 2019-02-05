/**
 * Contains salary information
 */
export class SalaryInformation {
    /**
     * The salary for a single paycheck before deductions are removed
     */
    paycheckGrossSalary: number;

    /**
     * The annual salary before deductions are removed
     */
    annualGrossSalary: number;

    /**
     * The salary for a single paycheck after deductions are removed
     */
    paycheckNetSalary: number;

    /**
     * The annual salary after deductions are removed
     */
    annualNetSalary: number;

    /**
     * The total deduction for a single paycheck
     */
    paycheckDeduction: number;

    /**
     * The total annual deduction
     */
    annualDeduction: number;

    /**
     * The number of pay periods per year
     */
    payPeriodsPerYear: number;
}
