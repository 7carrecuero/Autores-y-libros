import { BaseOut } from "../../../../Commons/Classes/baseOut";
import { Authors } from "../../../../Commons/Entities/authors";

export class GetAuthorsFiltersOut extends BaseOut { 
	   
    public Authors:Array<Authors>;
    
    public totalRecords:number;
	
}