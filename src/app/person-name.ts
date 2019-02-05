/**
 * Holds name information for a person
 */
export class PersonName {
    /**
     * The first name of this person
     */
    firstName: string;

    /**
     * The last name of this person
     */
    lastName: string;

    /**
     * Constructor for PersonName
     * @param firstName The first name of this person
     * @param lastName The last name of this person
     */
    constructor(
      firstName: string = '',
      lastName: string = ''
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
}
