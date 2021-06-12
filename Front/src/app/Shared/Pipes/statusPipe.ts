import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'status_pipe',
    pure: false
})

export class StatusPipe implements PipeTransform {

    constructor(private translateService: TranslateService) {

    }

    transform(status: string): string {
        if (status === 'V') {
            return this.translateService.instant('common.status.active');
        } else if (status === 'N') {
            return this.translateService.instant('common.status.inactive');
        } else if (status === 'B') {
            return this.translateService.instant('common.status.block');
        }
    }

}
