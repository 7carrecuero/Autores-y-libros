import { Injectable } from "@angular/core";
import { Proxy } from '../../../../Commons/Services/proxy';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { GetBooksFiltersOut } from "../MethodParameters/getBooksFiltersOut";
import { GetBooksFiltersIn } from "../MethodParameters/getBooksFiltersIn";

@Injectable()
export class BooksService {
	constructor(private proxy: Proxy) { }
		
	getBooksFilters(input:GetBooksFiltersIn): Observable<GetBooksFiltersOut> {
		let response = this.proxy.executePost("Books/GetBooksFilters", input,null,true).pipe(
			map((resp)=>this.mapGetBooksFiltersDataResponse(resp)));
		return response;
	}

    mapGetBooksFiltersDataResponse(info: any): GetBooksFiltersOut {
		let result = <GetBooksFiltersOut>info;
		return result;
	}
}