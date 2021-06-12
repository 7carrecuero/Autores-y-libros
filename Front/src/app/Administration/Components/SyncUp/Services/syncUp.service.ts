import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Proxy } from '../../../../Commons/Services/proxy';
import { GetSynchronizationIn } from "../MethodParameters/getSynchronizationIn";
import { GetSynchronizationOut } from "../MethodParameters/getSynchronizationOut";

@Injectable()
export class SyncUpService {
	constructor(private proxy: Proxy) { }

    getSynchronization(input:GetSynchronizationIn): Observable<GetSynchronizationOut> {
		let response = this.proxy.executePost("Integrations/GetSynchronization", input,null,true).pipe(
			map((resp)=>this.mapGetSynchronizationDataResponse(resp)));
		return response;
	}

    mapGetSynchronizationDataResponse(info: any): GetSynchronizationOut {
		let result = <GetSynchronizationOut>info;
		return result;
	}
}