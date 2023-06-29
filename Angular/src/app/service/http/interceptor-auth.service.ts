import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})

export class InterceptorAuthService implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    let authHeaderString = this.authenticationService.getAuthenticatedToken();
    let username = this.authenticationService.getAuthenticatedUser();

    if (authHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorization: authHeaderString
        }
      })
    }
    return next.handle(request);
  }
}
