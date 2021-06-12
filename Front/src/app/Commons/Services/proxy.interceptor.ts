import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, map, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { LocalStorageList, LocalStorage } from '../../Store/Classes/localStorage.reducers';
import { BaseIn } from '../Classes/baseIn';
import { Users } from '../Entities/users';


@Injectable({
  providedIn: 'root'
})
export class ProxyServiceInterceptor implements HttpInterceptor {
  constructor(private localStorage: Store<LocalStorageList>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newReques = request = request.clone({
      setHeaders: {}
    });

    const store = this.getData();

    if (newReques.body) {
      (newReques.body as BaseIn).currentSesId = store.find(item => item.key === 'sesId_front')
        ? store.find(item => item.key === 'sesId_front').value : '';
      // (newReques.body as BaseIn).currentUser = store.find(item => item.key === 'user_front')
      //   ? JSON.parse(store.find(item => item.key === 'user_front').value) : new Users();
    }

    return next.handle(newReques);

  }

  getData(): Array<LocalStorage> {
    let state: Array<LocalStorage>;
    this.localStorage.pipe(take(1)).subscribe(store => state = store.localStorage);
    return state;
  }

}
