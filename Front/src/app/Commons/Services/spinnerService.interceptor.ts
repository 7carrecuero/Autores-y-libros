import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../Shared/Services/spinner.service';
import { finalize, take } from 'rxjs/operators';
import { LocalStorageList, LocalStorage } from '../../Store/Classes/localStorage.reducers';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class SpinnerServiceInterceptor implements HttpInterceptor {
  constructor(public spinnerService: SpinnerService, private localStorage: Store<LocalStorageList>) { }
  contador = 0;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const store = this.getData();
    if (store.find(item => item.key === 'showLoader') && store.find(item => item.key === 'showLoader').value !== 'false') {
      this.contador++;
      this.spinnerService.show();
      request = request.clone({
        setHeaders: {}
      });
      return next.handle(request).pipe(
        finalize(() => {
          this.contador--;
          if (this.contador === 0) {
            this.spinnerService.hide();
          }
        }));
    } else {
      return next.handle(request);
    }
  }

  getData(): Array<LocalStorage> {
    let state: Array<LocalStorage>;
    this.localStorage.pipe(take(1)).subscribe(store => state = store.localStorage);
    return state;
  }

}
