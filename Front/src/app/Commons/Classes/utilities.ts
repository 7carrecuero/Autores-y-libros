
import * as moment from 'moment';
export class Utilities {
    
  constructor() {

  }

  base64ToArrayBuffer(base64) {
    if(base64 !== undefined){
      let binary_string =  window.atob(base64);
      let len = binary_string.length;
      let bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++)        {
          bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }
  }
  
  
  base64ArrayBuffer(arrayBuffer) {
    var base64    = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  
    var bytes         = new Uint8Array(arrayBuffer)
    var byteLength    = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength    = byteLength - byteRemainder
  
    var a, b, c, d
    var chunk
  
    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
  
      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
      d = chunk & 63               // 63       = 2^6 - 1
  
      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }
  
    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
      chunk = bytes[mainLength]
  
      a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
  
      // Set the 4 least significant bits to zero
      b = (chunk & 3)   << 4 // 3   = 2^2 - 1
  
      base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
  
      a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4
  
      // Set the 2 least significant bits to zero
      c = (chunk & 15)    <<  2 // 15    = 2^4 - 1
  
      base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }
    
    return base64
  }

  public toInteger(value: any): any {
    return typeof value === 'number' ? parseInt(`${value}`, 10):'';
  }

  dateToNgbDate(date: moment.Moment): any {
    if (!date) {
      return null;
    }
    return { year: date.year(), month: date.month()+1, day: date.date() };
  }

  public ngbDatetoDate(date: any): Date {
    if (!date) {
      return null;
    }
    return moment(date.year + '-' + date.month + '-' + date.day, 'YYYY-MM-DD').toDate();
  }

  public validateUnLimitedRangeTime(valueInitial: any, valueFinal: any): boolean {
    if((valueInitial.hour == 0 && valueFinal.hour == 23) && (valueInitial.minute == 0 && valueFinal.minute == 59)) {
      return true;
    }
  }

  public tryToInteger(value: any): number {
    let returnValue = parseInt(`${value}`, 10);
    if(typeof(returnValue) === 'number' && !isNaN(returnValue)) {
      return returnValue;
    } else {
      return 0;
    }
  }

  public toString(value: any): string {
    return (value !== undefined && value !== null) ? `${value}` : '';
  }

  public getValueInRange(value: number, max: number, min = 0): number {
    return Math.max(Math.min(value, max), min);
  }

  public isString(value: any): value is string {
    return typeof value === 'string';
  }

  public isNumber(value: any): value is number {
    return !isNaN(this.toInteger(value));
  }

  public isInteger(value: any): value is number {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  }

  public isDefined(value: any): boolean {
    return value !== undefined && value !== null;
  }

  public padNumber(value: any) {
    if (this.isNumber(value)) {
      return `${value}`.slice(-2);
    } else {
      return '';
    }
  }

  public regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  
  
}

export function toInteger(value: any): any {
  return typeof value === 'number' ? parseInt(`${value}`, 10):'';
}

// export function validateUnLimitedRangeTime(valueInitial: any, valueFinal: any): boolean {
//   if((valueInitial.hour == 0 && valueFinal.hour == 23) && (valueInitial.minute == 0 && valueFinal.minute == 59)) {
//     return true;
//   }
// }

// export function tryToInteger(value: any): number {
//   let returnValue = parseInt(`${value}`, 10);
//   if(typeof(returnValue) === 'number' && !isNaN(returnValue)) {
//     return returnValue;
//   } else {
//     return 0;
//   }
// }

// export function toString(value: any): string {
//   return (value !== undefined && value !== null) ? `${value}` : '';
// }

// export function getValueInRange(value: number, max: number, min = 0): number {
//   return Math.max(Math.min(value, max), min);
// }

// export function isString(value: any): value is string {
//   return typeof value === 'string';
// }

export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

// export function isInteger(value: any): value is number {
//   return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
// }

// export function isDefined(value: any): boolean {
//   return value !== undefined && value !== null;
// }



// export function regExpEscape(text) {
//   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// }
