import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../core/authentication/services/authentication.service';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private refreshingAccessToken: boolean;

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addAuthToken(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.refreshingAccessToken) {
          return this.handleHttpError401(request, next);
        }

        return throwError(error);
      })
    );
  }

  addAuthToken(request: HttpRequest<any>): HttpRequest<any> {
    const accessToken = this.authService.accessToken;
    if (accessToken) {
      return request.clone(
        {
          setHeaders: {
            authorization: `${accessToken}`
          }
        });
    }

    return request;
  }

  handleHttpError401(request: HttpRequest<any>, next: HttpHandler) {
    this.refreshingAccessToken = true;

    return this.authService.getNewAccessToken()
      .pipe(
        tap(() => {
          this.refreshingAccessToken = false;
          console.log("Access token refreshed!");
        }),
        switchMap(() => {
          request = this.addAuthToken(request);

          return next.handle(request);
        }),
        catchError(error => {
          console.log(`Error occured while refreshing access token: ${error}`);
          this.authService.logout();

          return throwError(error);
        })
      );
  }
}
