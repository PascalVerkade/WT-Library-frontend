import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let isLoggedIn = this.authenticationService.isUserLoggedIn();
    let isAdmin = this.authenticationService.isUserAdmin();

    let requiresAdmin = route.data['requiresAdmin'];

    if (requiresAdmin && isLoggedIn && isAdmin) { return true; }
    if (!requiresAdmin && isLoggedIn) { return true; }
    
    if (!isLoggedIn) { 
      this.router.navigate(['login']);
    } else if (requiresAdmin) { 
      this.router.navigate(['library']);
    }

    
    // if (this.authenticationService.isUserLoggedIn()) {
    //   return true;
    // }
    // this.router.navigate(['login'])
    return false;
  }
}
