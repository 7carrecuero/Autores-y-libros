import * as moment from 'moment';

export class BooksByAuthor {

    public $type: 'SD.Entities.Books, SD.Entities';
  
    public id: number;
  
    public title: string;
  
    public description: string;
  
    public pageCount: number;
  
    public excerpt: string;

    public publishDate: string;

    public bks_create_at: Date | moment.Moment;

    public bks_update_at: Date | moment.Moment;

    public athId: number;

    public name: string;
}