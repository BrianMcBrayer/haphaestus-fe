import { Employee } from './employee';

export const EMPLOYEES: Employee[] = [
    { 
        id: '1', 
        name: { 
            firstName: 'Bob', 
            lastName: 'Miller' 
        }, 
        spouseEnabled: false, 
        spouse: { 
            firstName: '', 
            lastName: '' }, 
        dependents: [

        ]  },
    { 
        id: '2', 
        name: { 
            firstName: 'Anila', 
            lastName: 'Jha' 
        }, 
        spouseEnabled: false, 
        spouse: { 
            firstName: '', 
            lastName: '' }, 
        dependents: [
            
        ]  },
];