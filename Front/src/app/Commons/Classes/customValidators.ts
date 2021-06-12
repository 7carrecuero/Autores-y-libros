import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { isNumber } from 'util';

export class CustomValidators {
  static birthDayAdult: any;
  static PasswordMustHaveNumbers(control: AbstractControl) {
    if (this.hasNumber(control.value)) {
      return null;
    }
    return {
      passwordMustHaveNumbers: 'Password without numbers are not allowed'
    };
  }

  static NumberPhone(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if (control.value.length === 0) {
      return { required: true };
    } else if (control.value.length === 1) {
      if (control.value !== '3') {
        control.setValue('');
        return null;
      }
    } else {
      if (control.value.length === 10) {
        if (!(/^3[0-9]\d{8}$/.test(control.value))) {
          control.setValue('');
          return null;
        }

      }
    }
    if ((/[^0-9]/.test(control.value))) {
      control.setValue(control.value.replace(/[^0-9]*/g, ''));
      return null;
    }
  }

  static MatchPassword(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ matchPassword: true });

    } else {
      return null;
    }
  }

  static EmailFormat(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }

    if ((/[^a-zA-Z0-9@._-]/.test(control.value))) {
      control.setValue(control.value.toString().replace(/[^a-zA-Z0-9@._-]*/g, ''));
    }

    if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(control.value))) {


      return { requiredEmailFormat: true };
    }
  }

  private static hasNumber(myString) {
    return /\d/.test(myString);
  }

  static AlphaNumericWithWhiteSpace(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]*/g, ''));
      return null;
    }
  }

  static AlphaNumericWithOutWhiteSpace(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]*/g, ''));
      return null;
    }
  }

  static AlphaWithWhiteSpace(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ ]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ ]*/g, ''));
      return null;
    }
  }

  static Numeric(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if ((/[^0-9]/.test(control.value))) {
      control.setValue(control.value.replace(/[^0-9]*/g, ''));
      return null;
    }
  }

  static MaxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const length: number = control.value ? control.value.length : 0;
      if (length > maxLength) {
        control.setValue(control.value.slice(0, maxLength));
      }
      return null;
      // return length > maxLength ?
      //     {'maxlength': {'requiredLength': maxLength, 'actualLength': length}} :
      //     null;
    };
  }

  static ToUpperCase(control: AbstractControl) {
    if (control.value && (/[a-zñáéíóú]/.test(control.value))) {
      control.setValue(control.value.toUpperCase());
    }
    return null;
  }

  static Percentage(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if ((/^[0-9]{1,5}\.[0-9]{1,5}/.test(control.value))) {
      return null;
    }
  }

  static PercentageBetween1to100(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if (!(/^100$|^[0-9]{1,2}$|^[0-9]{1,2}\.[0-9]{1,3}$/.test(control.value))) {
      return { requiredPercentage: true };
    }
    if (control.value === '0') {
      return { requiredPercentage: true };
    }
  }

  static WithOutWhiteSpace(control: AbstractControl) {
    if ((/^\s/.test(control.value))) {
      control.setValue(control.value.replace(/^\s/g, ''));
      return null;
    }
  }

  static IsNullorEmpty(control: AbstractControl) {
    if (
      control.value === null ||
      control.value === undefined ||
      control.value === 'undefined' ||
      control.value === ''
    ) {
      // control.setValue(undefined);
      return { required: true };
    } else {
      return null;
    }
  }

  static CompareDate(date1: string, date2: string, control: AbstractControl) {

    let starDate: Date;
    let endDate: Date;
    if (control.get(date1).value !== 'undefined') {
      const date = CustomValidators.format(control.get(date1).value);
      starDate = new Date(date);
    }


    if (control.get(date2).value !== 'undefined') {
      const date = CustomValidators.format(control.get(date2).value);
      endDate = new Date(date);
    }

    if (control.get(date2).value === '' || control.get(date2).value === null) {
      control.get(date2).setErrors({ required: true });
    } else

      if (starDate > endDate) {
        control.get(date2).setErrors({ invalidDate: true });
      } else {
        control.get(date2).setErrors({ invalidDate: false });
        control.get(date2).setErrors({ required: false });
        return null;
      }
  }

  static CompareDates(date1: string, date2: string, control: AbstractControl) {
    let starDate: Date;
    let endDate: Date;
    if (control.get(date1).value !== 'undefined') {
      const date = CustomValidators.format(control.get(date1).value);
      starDate = new Date(date);

    }

    if (control.get(date2).value !== 'undefined') {
      const date = CustomValidators.format(control.get(date2).value);
      endDate = new Date(date);
    }


    if (starDate > endDate) {
      control.get(date2).setErrors({ invalidDate: true });
    } else if (starDate < endDate) {
      control.get(date2).setErrors(null);
    }
  }

  static format(date: NgbDateStruct): string {
    let stringDate = '';
    if (date) {

      stringDate += date.year + '/';
      stringDate += isNumber(date.month) ? JSON.stringify(date.month) + '/' : '';
      stringDate += isNumber(date.day) ? JSON.stringify(date.day) : '';

    }
    return stringDate;
  }

  static DaysofYear(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if (!(/^(?:36[0-5]|3[0-5]\d|[12]\d{2}|[1-9]+(\.\d{1,2})?)$/.test(control.value))) {
      return { requiredDayofYear: true };
    }
    if (control.value === '0') {
      return { requiredDayofYear: true };
    }
  }

  static AlphaNumericWhiteSpaceSpecificCharacters(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\.\,\;\-\/\%\(\)\' ]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\.\,\;\-\/\%\(\)\' ]*/g, ''));
      return null;
    }
  }

  static PercentageBetween0to200(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if ((<number>control.value) < 0 || (<number>control.value) > 200) {
      return { required200Percentage: true };
    }
    // if(!(/^([0-9]|[1-9][0-9]|[1][0-9][0-9]|20[0-0])+(\.[0-9]{1,2})?$/.test(control.value))) {
    //   return { required200Percentage: true };
    // }
  }

  static EnailFormat(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if (!(/(([^<>()[\]\.,;:\s@\']+(\.[^<>()[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/
      .test(control.value))) {
      return { requiredEmailFormat: true };
    }
  }

  static PercentageBetween0to100(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if (!(/^100$|^[0-9]{1,2}$|^[0-9]{1,2}\.[0-9]{1,3}$/.test(control.value))) {
      return { requiredPercentage: true };
    }
  }

}
