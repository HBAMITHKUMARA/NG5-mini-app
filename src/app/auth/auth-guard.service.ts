import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated();
  }

}
