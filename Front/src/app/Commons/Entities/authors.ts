
import * as moment from 'moment';
import { Books } from './books';

export class Authors {

  public $type: 'SD.Entities.Authors, SD.Entities';

  public id: number;

  public idBook: number;

  public firstName: string;

  public lastName: string;

  public ath_create_at: Date | moment.Moment;

  public ath_update_at: Date | moment.Moment;

  public Book:Array<Books>;
}