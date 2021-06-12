import {Component, forwardRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


import {SdTimepickerConfig} from './timepicker-config';
import {SdTimeAdapter} from './sd-time-adapter';
import { SdTime } from './sd-time';
import { Utilities } from '../../Classes/utilities';

const Sd_TIMEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Timepicker),
  multi: true
};

/**
 * A lightweight & configurable timepicker directive.
 */
@Component({
  selector: 'sd-timepicker',
  styleUrls: ['./timepicker.scss'],
  template: `
    <div class="d-flex">
      <div *ngIf="label != ''" class="col-4 my-auto colorTitle">{{label}}</div>
      <div [ngClass]="{'col-8': label != '', 'col-12': label == ''}">
        <fieldset [disabled]="disabled" [class.disabled]="disabled">
          <div class="Sd-tp">
            <div class="Sd-tp-input-container Sd-tp-hour">
              <button *ngIf="spinners" type="button" (click)="changeHour(hourStep)"
                class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
                [disabled]="disabled">
                <span class="chevron"></span>
                <span class="sr-only" i18n="@@Sd.timepicker.increment-hours">Increment hours</span>
              </button>
              <input type="text" [(ngModel)]="model.hour" numeric class="form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize" maxlength="2"
                placeholder="HH" i18n-placeholder="@@Sd.timepicker.HH"
                [value]="formatHour(model?.hour)" (change)="updateHour($event.target.value)"
                [readonly]="readonlyInputs" [disabled]="disabled" aria-label="Hours" i18n-aria-label="@@Sd.timepicker.hours">
              <button *ngIf="spinners" type="button" (click)="changeHour(-hourStep)"
                class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
                [disabled]="disabled">
                <span class="chevron bottom"></span>
                <span class="sr-only" i18n="@@Sd.timepicker.decrement-hours">Decrement hours</span>
              </button>
            </div>
            <div class="Sd-tp-spacer">:</div>
            <div class="Sd-tp-input-container Sd-tp-minute">
              <button *ngIf="spinners" type="button" (click)="changeMinute(minuteStep)"
                class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
                [disabled]="disabled">
                <span class="chevron"></span>
                <span class="sr-only" i18n="@@Sd.timepicker.increment-minutes">Increment minutes</span>
              </button>
              <input type="text" [(ngModel)]="model.minute" numeric class="form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize" maxlength="2"
                placeholder="MM" i18n-placeholder="@@Sd.timepicker.MM"
                [value]="formatMinSec(model?.minute)" (change)="updateMinute($event.target.value)"
                [readonly]="readonlyInputs" [disabled]="disabled" aria-label="Minutes" i18n-aria-label="@@Sd.timepicker.minutes">
              <button *ngIf="spinners" type="button" (click)="changeMinute(-minuteStep)"
                class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled"
                [disabled]="disabled">
                <span class="chevron bottom"></span>
                <span class="sr-only"  i18n="@@Sd.timepicker.decrement-minutes">Decrement minutes</span>
              </button>
            </div>
            <div *ngIf="seconds" class="Sd-tp-spacer">:</div>
            <div *ngIf="seconds" class="Sd-tp-input-container Sd-tp-second">
              <button *ngIf="spinners" type="button" (click)="changeSecond(secondStep)"
                class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
                [disabled]="disabled">
                <span class="chevron"></span>
                <span class="sr-only" i18n="@@Sd.timepicker.increment-seconds">Increment seconds</span>
              </button>
              <input type="text" [(ngModel)]="model.second" numeric class="form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize" maxlength="2"
                placeholder="SS" i18n-placeholder="@@Sd.timepicker.SS"
                [value]="formatMinSec(model?.second)" (change)="updateSecond($event.target.value)"
                [readonly]="readonlyInputs" [disabled]="disabled" aria-label="Seconds" i18n-aria-label="@@Sd.timepicker.seconds">
              <button *ngIf="spinners" type="button" (click)="changeSecond(-secondStep)"
                class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled"
                [disabled]="disabled">
                <span class="chevron bottom"></span>
                <span class="sr-only" i18n="@@Sd.timepicker.decrement-seconds">Decrement seconds</span>
              </button>
            </div>
            <div *ngIf="meridian" class="Sd-tp-spacer"></div>
            <div *ngIf="meridian" class="Sd-tp-meridian">
              <button type="button" class="btn btn-outline-primary" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"
                [disabled]="disabled" [class.disabled]="disabled"
                      (click)="toggleMeridian()">
                <ng-container *ngIf="model?.hour >= 12; else am" i18n="@@Sd.timepicker.PM">PM</ng-container>
                <ng-template #am i18n="@@Sd.timepicker.AM">AM</ng-template>
              </button>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  `,
  providers: [Sd_TIMEPICKER_VALUE_ACCESSOR]
})
export class Timepicker implements ControlValueAccessor, OnChanges {
  disabled: boolean;
  model: SdTime;
  utils: Utilities;

  /**
   * Whether to display 12H or 24H mode.
   */
  @Input() meridian: boolean;

  @Input() label: string = '';

  /**
   * Whether to display the spinners above and below the inputs.
   */
  @Input() spinners: boolean;

  /**
   * Whether to display seconds input.
   */
  @Input() seconds: boolean;

  /**
   * Number of hours to increase or decrease when using a button.
   */
  @Input() hourStep: number;

  /**
   * Number of minutes to increase or decrease when using a button.
   */
  @Input() minuteStep: number;

  /**
   * Number of seconds to increase or decrease when using a button.
   */
  @Input() secondStep: number;

  /**
   * To make timepicker readonly
   */
  @Input() readonlyInputs: boolean;

  /**
   * To set the size of the inputs and button
   */
  @Input() size: 'small' | 'medium' | 'large';

  constructor(config: SdTimepickerConfig, private _SdTimeAdapter: SdTimeAdapter<any>) {
    this.utils = new Utilities();
    this.meridian = config.meridian;
    this.spinners = config.spinners;
    this.seconds = config.seconds;
    this.hourStep = config.hourStep;
    this.minuteStep = config.minuteStep;
    this.secondStep = config.secondStep;
    this.disabled = config.disabled;
    this.readonlyInputs = config.readonlyInputs;
    this.size = config.size;
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value) {
    const structValue = this._SdTimeAdapter.fromModel(value);
    this.model = structValue ? new SdTime(structValue.hour, structValue.minute, structValue.second) : new SdTime();
    if (!this.seconds && (!structValue || !this.utils.isNumber(structValue.second))) {
      this.model.second = 0;
    }
  }

  registerOnChange(fn: (value: any) => any): void { this.onChange = fn; }

  registerOnTouched(fn: () => any): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean) { this.disabled = isDisabled; }

  changeHour(step: number) {
    this.model.changeHour(step);
    this.propagateModelChange();
  }

  changeMinute(step: number) {
    this.model.changeMinute(step);
    this.propagateModelChange();
  }

  changeSecond(step: number) {
    this.model.changeSecond(step);
    this.propagateModelChange();
  }

  updateHour(newVal: string) {
    const isPM = this.model.hour >= 12;
    const enteredHour = this.utils.tryToInteger(newVal);
    if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
      this.model.updateHour(enteredHour + 12);
    } else {
      this.model.updateHour(enteredHour);
    }
    this.propagateModelChange();
  }

  updateMinute(newVal: string) {
    this.model.updateMinute(this.utils.tryToInteger(newVal));
    this.propagateModelChange();
  }

  updateSecond(newVal: string) {
    this.model.updateSecond(this.utils.tryToInteger(newVal));
    this.propagateModelChange();
  }

  toggleMeridian() {
    if (this.meridian) {
      this.changeHour(12);
    }
  }

  formatHour(value: number) {
    if (this.utils.isNumber(value)) {
      if (this.meridian) {
        return this.utils.padNumber(value % 12 === 0 ? 12 : value % 12);
      } else {
        return this.utils.padNumber(value > 23 ? 23 : value);
      }
    } else {
      return '';
    }
  }

  formatMinSec(value: number) { return this.utils.padNumber(value > 59 ? 59 : value); }

  get isSmallSize(): boolean { return this.size === 'small'; }

  get isLargeSize(): boolean { return this.size === 'large'; }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['seconds'] && !this.seconds && this.model && !this.utils.isNumber(this.model.second)) {
      this.model.second = 0;
      this.propagateModelChange(false);
    }
  }

  private propagateModelChange(touched = true) {
    if (touched) {
      this.onTouched();
    }
    if (this.model.isValid(this.seconds)) {
      this.onChange(
          this._SdTimeAdapter.toModel({hour: this.model.hour, minute: this.model.minute, second: this.model.second}));
    } else {
      this.onChange(this._SdTimeAdapter.toModel(null));
    }
  }
}
