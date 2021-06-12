import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageList } from '../../Store/Classes/localStorage.reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private localStorage: Store<LocalStorageList>, private routes: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    let token = localStorage.getItem('tokensJWT');
    if(token != null){        
      return true;
    }
    this.routes.navigate(['/Login']);
    return false;
  }
}
