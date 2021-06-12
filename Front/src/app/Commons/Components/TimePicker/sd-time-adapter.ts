import {Injectable} from '@angular/core';
import {SdTimeStruct} from './sd-time-struct';
import { Utilities } from '../../Classes/utilities';

export function Sd_DATEPICKER_TIME_ADAPTER_FACTORY() {
  return new SdTimeStructAdapter();
}

/**
 * Abstract type serving as a DI token for the service converting from your application Time model to internal
 * SdTimeStruct model.
 * A default implementation converting from and to SdTimeStruct is provided for retro-compatibility,
 * but you can provide another implementation to use an alternative format, ie for using with native Date Object.
 *
 * @since 2.2.0
 */
@Injectable({providedIn: 'root', useFactory: Sd_DATEPICKER_TIME_ADAPTER_FACTORY})
export abstract class SdTimeAdapter<T> {
  /**
   * Converts user-model date into an SdTimeStruct for internal use in the library
   */
  abstract fromModel(value: T): SdTimeStruct;

  /**
   * Converts internal time value SdTimeStruct to user-model date
   * The returned type is supposed to be of the same type as fromModel() input-value param
   */
  abstract toModel(time: SdTimeStruct): T;
}

@Injectable()
export class SdTimeStructAdapter extends SdTimeAdapter<SdTimeStruct> {

  utilities: Utilities;

  constructor(){
    super();
    this.utilities = new Utilities();
  }

  /**
   * Converts a SdTimeStruct value into SdTimeStruct value
   */
  fromModel(time: SdTimeStruct): SdTimeStruct {
    return (time && this.utilities.isInteger(time.hour) && this.utilities.isInteger(time.minute)) ?
        {hour: time.hour, minute: time.minute, second: this.utilities.isInteger(time.second) ? time.second : null} :
        null;
  }

  /**
   * Converts a SdTimeStruct value into SdTimeStruct value
   */
  toModel(time: SdTimeStruct): SdTimeStruct {
    return (time && this.utilities.isInteger(time.hour) && this.utilities.isInteger(time.minute)) ?
        {hour: time.hour, minute: time.minute, second: this.utilities.isInteger(time.second) ? time.second : null} :
        null;
  }

}
