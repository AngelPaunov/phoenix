import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.accessToken) {
      this.router.navigateByUrl('/auth/login');

      return false;
    }

    let url = route.url.toString().toLocaleLowerCase();
    if (url === 'login' || url === 'sign-up') {
      return false;
    }
    return true;
  }
}
