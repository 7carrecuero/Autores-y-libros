import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'status_pipe',
    pure: false
})

export class PortalTypePipe implements PipeTransform {

    constructor(private translateService: TranslateService) {

    }

    transform(type: string): string {
        if (type === 'MO') {
            return this.translateService.instant('common.portal.administrative');
        } else if (status === 'FO') {
            return this.translateService.instant('common.portal.persons');
        }
    }

}
