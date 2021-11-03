import { AbstractControl, ValidatorFn } from '@angular/forms';


export class PhoneValidator {

  // Inspired on: https://github.com/yuyang041060120/ng2-validation/blob/master/src/equal-to/validator.ts
  static validCountryPhone = (countryControl: AbstractControl): ValidatorFn => {
    let subscribe: boolean = false;

    return (phoneControl: AbstractControl): {[key: string]: boolean} => {
      if (!subscribe) {
        subscribe = true;
        countryControl.valueChanges.subscribe(() => {
          phoneControl.updateValueAndValidity();
        });
      }

      if(phoneControl.value !== ""){
        try{

         

       
        }catch(e){
          // console.log(e);
          return {
            validCountryPhone: true
          };
        }

        return {
          validCountryPhone: true
        };
      }
      else{
        return null;
      }
    };
  };
}
