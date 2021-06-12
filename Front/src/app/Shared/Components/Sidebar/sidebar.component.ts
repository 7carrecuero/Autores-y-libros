import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
// import { ProfileService } from '../../../Administration/Components/Profile/Services/profile.service';
// import { GetProfileActionsIn } from '../../../Administration/Components/Profile/MethodParameters/getProfileActionsIn';
import { LocalStorageList } from '../../../Store/Classes/localStorage.reducers';
import { Store } from '@ngrx/store';
import { SetItemAction } from '../../../Store/LocalStorage/localStorage.actions';
import { map, switchMap, finalize } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { Result } from '../../../Commons/Classes/result';

declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, AfterViewInit {

  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  private profileSubscription: Subscription;
  private onInit = true;

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private localStorage: Store<LocalStorageList>,
    private router: Router
  ) { }

  ngOnInit() {
   
  }

  ngAfterViewInit(): void {
    // this.profileSubscription.unsubscribe();
  }

}
