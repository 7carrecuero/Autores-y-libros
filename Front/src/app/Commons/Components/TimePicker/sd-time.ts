import { Utilities } from '../../Classes/utilities';

export class SdTime {
  hour: number;
  minute: number;
  second: number;
  utils: Utilities;

  constructor(hour?: number, minute?: number, second?: number) {
    this.utils = new Utilities();
    this.hour = this.utils.toInteger(hour);
    this.minute = this.utils.toInteger(minute);
    this.second = this.utils.toInteger(second);
  }

  changeHour(step = 1) { this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step); }

  updateHour(hour: number) {
    if (this.utils.isNumber(hour)) {
      this.hour = (hour < 0 ? 24 + hour : hour) % 24;
    } else {
      this.hour = NaN;
    }
  }

  changeMinute(step = 1) { this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step); }

  updateMinute(minute: number) {
    if (this.utils.isNumber(minute)) {
      this.minute = minute % 60 < 0 ? 60 + minute % 60 : minute % 60;
      this.changeHour(Math.floor(minute / 60));
    } else {
      this.minute = NaN;
    }
  }

  changeSecond(step = 1) { this.updateSecond((isNaN(this.second) ? 0 : this.second) + step); }

  updateSecond(second: number) {
    if (this.utils.isNumber(second)) {
      this.second = second < 0 ? 60 + second % 60 : second % 60;
      this.changeMinute(Math.floor(second / 60));
    } else {
      this.second = NaN;
    }
  }

  isValid(checkSecs = true) {
    return this.utils.isNumber(this.hour) && this.utils.isNumber(this.minute) && (checkSecs ? this.utils.isNumber(this.second) : true);
  }

  toString() { return `${this.hour || 0}:${this.minute || 0}:${this.second || 0}`; }
}
