import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';

@Pipe({
    name: 'date_format_pipe',
    pure: false
})

export class DateFormatPipe implements PipeTransform {

    constructor() {

    }

    transform(format: string, date: Moment): string {
        if (date !== null) {
            return date.format(format);
        }
    }

}
