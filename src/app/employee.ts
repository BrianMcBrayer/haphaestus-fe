import { PersonName } from './person-name';

/**
 * Holds individual and relationship information for an employee
 */
export class Employee {
    /**
     * The identifier of this employee
     */
    id: number;

    /**
     * The name of this employee
     */
    name: PersonName;

    /**
     * The spouse of this employee
     */
    spouse: PersonName;

    /**
     * If true, this employee has a spouse
     */
    isSpouseEnabled: boolean;

    /**
     * Array of non-spouse dependents of this employee, if any
     */
    dependents: PersonName[];

    /**
     *
     * @param id The identifier of this employee
     * @param name The name of this employee
     * @param spouse The spouse of this employee
     * @param isSpouseEnabled If true, this employee has a spouse
     * @param dependents Array of non-spouse dependents of this employee, if any
     */
    constructor(
      id: number = null,
      name: PersonName = new PersonName(),
      spouse: PersonName = new PersonName(),
      isSpouseEnabled?: boolean,
      dependents: PersonName[] = []) {
        this.id = id;
        this.name = name;
        this.spouse = spouse;
        this.isSpouseEnabled = isSpouseEnabled;
        this.dependents = dependents;
      }
}
