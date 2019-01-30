import { PersonName } from './personName';

export class Employee {
    id: string;
    name: PersonName;
    spouse: PersonName;
    spouseEnabled: boolean;
    dependents: PersonName[];
}