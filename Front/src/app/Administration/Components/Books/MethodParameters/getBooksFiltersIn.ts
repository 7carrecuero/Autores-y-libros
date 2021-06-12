import { BaseIn } from "../../../../Commons/Classes/baseIn";
import * as moment from 'moment';

export class GetBooksFiltersIn extends BaseIn { 
	      
    public initialDate: Date | moment.Moment;

    public endDate: Date | moment.Moment;
    
    public athId: Date | moment.Moment;

    public pageSize:number;
    
    public pageNumber:number;
    
    public orderBy:string;
    
    public orderDirection:string;
	
}