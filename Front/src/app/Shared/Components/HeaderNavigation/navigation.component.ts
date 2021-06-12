import { Component, AfterViewInit, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Users } from '../../../Commons/Entities/users';
// import { AuthenticationService } from '../../../Administration/Components/Authentication/Services/authentication.service';
// import { CloseSessionIn } from '../../../Administration/Components/Authentication/MethodParameters/closeSessionIn';
// import { CloseSessionOut } from '../../../Administration/Components/Authentication/MethodParameters/closeSessionOut';
import { LocalStorageList } from '../../../Store/Classes/localStorage.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ClearAction } from '../../../Store/LocalStorage/localStorage.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};
  user: Users;
  private sesID = '';
  private subscribeLocal: Subscription;
  constructor(private localStorage: Store<LocalStorageList>, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.subscribeLocal = this.localStorage.select('localStorage').pipe(
      filter(resp => resp.length > 0)
    ).subscribe(response => {
      this.user = JSON.parse(response.find(item => item.key === 'user_adm').value);
      this.sesID = response.find(item => item.key === 'sesId_adm').value;
    });
  }

  ngOnDestroy(): void {
    this.subscribeLocal.unsubscribe();
  }

  ngAfterViewInit() { }

  onLogoutClick() {
    // const closeSession = new CloseSessionIn();
    // closeSession.userSession = this.sesID;
    // this.auth.CloseSession(closeSession);
    // this.localStorage.dispatch(new ClearAction());
  }
}
