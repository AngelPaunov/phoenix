import { HttpClient, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from 'src/environments/api-paths.enum';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login-model';

import { tap, shareReplay } from 'rxjs/operators';
import { SignUpModel } from '../models/sign-up-model';
import { Tokens } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private httpClient: HttpClient) {
  }

  public get accessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  public get isAccessTokenExpired() {
    if (!this.accessToken) {
      return false;
    }

    const expiry = (JSON.parse(atob(this.accessToken.split('.')[1]))).exp;

    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  login(loginCredentials: LoginModel) {
    return this.httpClient.post<Tokens>(`${environment.baseApiUrl}${ApiPaths.Login}`, loginCredentials)
      .pipe(
        shareReplay(),
        tap(tokens => this.setTokens(tokens))
      );
  }

  signUp(signUpCredentials: SignUpModel) {
    return this.httpClient.post(`${environment.baseApiUrl}${ApiPaths.SignUp}`, signUpCredentials);
  }

  getNewAccessToken() {
    return this.httpClient.get<Tokens>(`${environment.baseApiUrl}${ApiPaths.Refresh}`, {
      headers: {
        'authorization': this.refreshToken
      }
    }).pipe(
      tap(tokens => this.setTokens(tokens))
    );
  }

  logout() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private get refreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private setTokens(tokens: Tokens) {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }
}
