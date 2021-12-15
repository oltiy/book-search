import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { BooksService } from './book.service';

@Injectable({
  providedIn: 'root',
})
export class UserNameGuardGuard implements CanActivate {
  userName!: boolean;
  check = this.bookservice.hasUserName();
  //Hi Eliran I tried to add navigation too, in case someםמק tries to enter the search or wish page without a username, but it did not work
  constructor(private router: Router, private bookservice: BooksService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.check;
  }
}
