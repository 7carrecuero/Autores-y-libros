import { BaseOut } from "../../../../Commons/Classes/baseOut";
import { BooksByAuthor } from "../../../../Commons/Entities/booksByauthor";

export class GetBooksFiltersOut extends BaseOut { 
	   
    public booksByAuthors:Array<BooksByAuthor>;
    
    public totalRecords:number;
	
}