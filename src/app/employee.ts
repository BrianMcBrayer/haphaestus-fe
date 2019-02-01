import { PersonName } from './person-name';

export class Employee {
    id: number;
    name: PersonName;
    spouse: PersonName;
    isSpouseEnabled: boolean;
    dependents: PersonName[];

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
