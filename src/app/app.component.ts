import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { map } from 'rxjs/operators';
import { AppState } from './reducers/index';
import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { login, logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;

    islogginedIn$: Observable<boolean>;

    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router,
      private store: Store<AppState>) {

    }

    ngOnInit() {

      const userProfile = localStorage.getItem("user");
      if(userProfile){
        this.store.dispatch(login({user: JSON.parse(userProfile)}))
      }

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      this.islogginedIn$ = this.store.pipe(
        select(isLoggedIn)
      );

      this.isLoggedOut$ = this.store.pipe(
        select(isLoggedOut)
      )
    }

    logout() {
      this.store.dispatch(logout());
    }

}
