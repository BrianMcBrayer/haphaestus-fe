import { TestBed } from '@angular/core/testing';

import { SalaryComputationsService } from './salary-computations.service';
import { PersonName } from './person-name';

describe('SalaryComputationsService', () => {
  let service: SalaryComputationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(SalaryComputationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAnnualDeductionForPerson', () => {
    describe('happy path', () => {
      describe('for PersonName of employee', () => {
        it('should provide full deduction with first, last name not starting with discounted character', () => {
          const result = service.getAnnualDeductionForPerson(personNameWithNeitherDiscounted(), false);

          expect(result).toBe(service.deductionPerEmployee);
        });

        it('should provide full deduction with only first name starting with discounted character', () => {
          const result = service.getAnnualDeductionForPerson(personNameWithFirstDiscounted(), false);

          expect(result).toBe(service.deductionPerEmployee - (service.deductionPercent * service.deductionPerEmployee));
        });

        it('should provide full deduction with only last name starting with discounted character', () => {
          const result = service.getAnnualDeductionForPerson(personNameWithLastDiscounted(), false);

          expect(result).toBe(service.deductionPerEmployee - (service.deductionPercent * service.deductionPerEmployee));
        });
      });

      describe('for PersonName of dependent', () => {
        it('should provide full deduction with first, last name not starting with discounted character', () => {
          const result = service.getAnnualDeductionForPerson(personNameWithNeitherDiscounted(), true);

          expect(result).toBe(service.deductionPerDependent);
        });

        it('should provide full deduction with only first name starting with discounted character', () => {
          const result = service.getAnnualDeductionForPerson(personNameWithFirstDiscounted(), true);

          expect(result).toBe(service.deductionPerDependent - (service.deductionPercent * service.deductionPerDependent));
        });

        it('should provide full deduction with only last name starting with discounted character', () => {
          const result = service.getAnnualDeductionForPerson(personNameWithLastDiscounted(), true);

          expect(result).toBe(service.deductionPerDependent - (service.deductionPercent * service.deductionPerDependent));
        });
      });
    });
  });

  function personNameWithFirstDiscounted(): PersonName {
    return new PersonName(discountedName(), nonDiscountedName());
  }

  function personNameWithLastDiscounted(): PersonName {
    return new PersonName(nonDiscountedName(), discountedName());
  }

  function personNameWithNeitherDiscounted(): PersonName {
    return new PersonName(nonDiscountedName(), nonDiscountedName());
  }

  function discountedName(): string {
    return service.discountedFirstCharacter + 'Bob';
  }

  function nonDiscountedName(): string {
    const nonDiscountedFirstCharacter = (service.discountedFirstCharacter === 'a' ? 'b' : 'a');
    return nonDiscountedFirstCharacter + 'Bob';
  }

});
