import {
  Component,
  Input,
  OnDestroy,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { SpinnerService } from '../Services/spinner.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="preloader" [ngStyle]="{'background': backgroundColor}" *ngIf="isSpinnerVisible || (isLoading |async)">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
    </div>`,
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
  public isSpinnerVisible = true;
  @Input() public backgroundColor = 'rgba(255,255,255,0.5)'; // 'rgba(0, 115, 170, 0.69)';
  isLoading: Subject<boolean> = this.spinnerService.isLoading;
  constructor(
    private spinnerService: SpinnerService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.isSpinnerVisible = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isSpinnerVisible = false;
        }
      },
      () => {
        this.isSpinnerVisible = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }
}
