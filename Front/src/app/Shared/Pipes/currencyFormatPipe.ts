import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';

@Pipe({
    name: 'currencyFormatPipe',
    pure: false
})

export class CurrencyFormatPipe implements PipeTransform {

    constructor() {

    }

    transform(rawValue: string, prefix: string, thousands: string, decimal: string, precision: number, integerMax: number): string {
        // let { allowNegative, decimal, precision, prefix, suffix, thousands, integerMax } = options;
        rawValue = new Number(rawValue).toFixed(precision);
        let onlyNumbers = rawValue.replace(/[^0-9]/g, '');

        if (!onlyNumbers) {
            return '';
        }

        let integerPart = onlyNumbers.slice(0, onlyNumbers.length - precision).replace(/^0*/g, "");

        if (integerPart == "") {
            integerPart = "0";
        }
        if (integerPart.length > integerMax) {
            integerPart = integerPart.substring(0, integerMax);
        }

        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousands);

        integerMax = integerMax - precision;

        let newRawValue = integerPart;
        let decimalPart = onlyNumbers.slice(onlyNumbers.length - precision);

        if (precision > 0) {
            decimalPart = "0".repeat(precision - decimalPart.length) + decimalPart;
            newRawValue += decimal + decimalPart;
        }

        // if(integerPart.length > integerMax) {
        //     integerPart = integerPart.substring(0, integerMax);
        // }

        let isZero = parseInt(integerPart) == 0 && (parseInt(decimalPart) == 0 || decimalPart == "");
        let operator = (rawValue.indexOf("-") > -1 && !isZero) ? "-" : "";
        return operator + prefix + newRawValue;
    }

}