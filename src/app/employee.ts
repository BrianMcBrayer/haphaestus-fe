import { PersonName } from './personName';

export class Employee {
    id: string;
    name: PersonName;
    spouse: PersonName;
    isSpouseEnabled: boolean;
    dependents: PersonName[];
}
