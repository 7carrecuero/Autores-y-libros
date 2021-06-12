import { BaseIn } from "../../../../Commons/Classes/baseIn";

export class GetAuthorsFiltersIn extends BaseIn { 
	   
   
    public pageSize:number;
    
    public pageNumber:number;
    
    public orderBy:string;
    
    public orderDirection:string;
	
}