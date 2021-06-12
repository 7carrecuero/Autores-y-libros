import { Injectable } from "@angular/core";
import { Proxy } from '../../../../Commons/Services/proxy';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { GetAuthorsFiltersIn } from "../MethodParameters/getAuthorsFiltersIn";
import { GetAuthorsFiltersOut } from "../MethodParameters/getAuthorsFiltersOut";
import { GetAuthorsReportIn } from "../MethodParameters/getAuthorsReportIn";
import { GetAuthorsReportOut } from "../MethodParameters/gGetAuthorsReportOut";

@Injectable()
export class AuthorsService {
	constructor(private proxy: Proxy) { }
		
	getAuthorsFilters(input:GetAuthorsFiltersIn): Observable<GetAuthorsFiltersOut> {
		let response = this.proxy.executePost("Authors/GetAuthorsFilters", input,null,true).pipe(
			map((resp)=>this.mapGetAuthorsFiltersDataResponse(resp)));
		return response;
	}

    mapGetAuthorsFiltersDataResponse(info: any): GetAuthorsFiltersOut {
		let result = <GetAuthorsFiltersOut>info;
		return result;
	}

	getAuthorsReport(input:GetAuthorsReportIn): Observable<GetAuthorsReportOut> {
		let response = this.proxy.executePost("Authors/GetAuthorsReport", input,null,true).pipe(
			map((resp)=>this.mapGetAuthorsReportDataResponse(resp)));
		return response;
	}

    mapGetAuthorsReportDataResponse(info: any): GetAuthorsReportOut {
		let result = <GetAuthorsReportOut>info;
		return result;
	}
}