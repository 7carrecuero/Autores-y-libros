import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'moneyformat'})
export class MoneyformatPipe implements PipeTransform {
  transform(value: string): string {
    let newStr = '';

    value = parseInt(value).toLocaleString('de-DE');
    newStr = '$ '  + value;
    return newStr;
  }
}
