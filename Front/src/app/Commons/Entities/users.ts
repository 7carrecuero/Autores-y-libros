import * as moment from 'moment';
import { Serializable } from '../Classes/serializable';

export class Users extends Serializable {
    
  public usrID: number;
  
  public usr_name: string;
  
  public usr_surname: string;
  
  public usr_document_number: number;
  
  public usr_email: string;

  public usr_age: number;

  public usr_status: string;

  public usr_create_at: Date | moment.Moment;

}