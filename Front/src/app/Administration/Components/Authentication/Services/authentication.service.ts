import { Injectable } from '@angular/core';
import { Proxy } from '../../../../Commons/Services/proxy';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { LoginRequest } from '../MethodParameters/loginRequest';

@Injectable()
export class AuthenticationService {
	constructor(private proxy: Proxy) { }
		
	authenticate(input:LoginRequest): Observable<any> {
		let response = this.proxy.executePost("authenticate", input,null,false).pipe(
			map((resp)=>this.mapAuthenticateDataResponse(resp)));
		return response;
	}

    mapAuthenticateDataResponse(info: any): any {
		let result = <any>info;
		return result;
	}
}