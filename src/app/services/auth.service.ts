import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap, mapTo } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly X_AUTH_TOKEN = '_T';
  private readonly X_REFRESH_TOKEN = 'R_T';
  private LoggedUser: string;

  constructor(
    private httpService: AppHttpService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login(user: { email: string; password: string }): Observable<any> {
    return this.httpService.callPostApi('/users/login', user).pipe(
      tap((res) => this.doLoginUser(user.email, res)),
      mapTo(true),
      catchError((error) => {
        alert(error);
        return of(false);
      })
    );
  }

  logout(): Observable<any> {
    const body = JSON.stringify({ R_Token: this.getRefreshToken()});
    return this.httpService
      .callPostApi('/users/logout', body )
      .pipe(
        tap((tokens) => this.doLogoutUser()),
        mapTo(true),
        catchError((error) => {
          alert(error);
          return of(false);
        })
      );
  }

  refreshToken() {
    return this.httpService
      .callPostApi('/users/refresh', {
        R_Token: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens) => {
          this.storeAuthToken(tokens);
        })
      );
  }

  isLoggedIn() {
    return !!this.getAuthToken();
  }

  getAuthToken() {
    return this.localStorageService.getData(this.X_AUTH_TOKEN);
  }

  private doLoginUser(username: string, res) {
    this.LoggedUser = username;
    this.storeTokens(res);
    this.router.navigate(['home'], {relativeTo: this.route});
  }

  private doLogoutUser() {
    this.LoggedUser = null;
    this.removeTokens();
    this.router.navigate(['/login']);
  }

  private storeTokens(res) {
    this.localStorageService.setData(this.X_AUTH_TOKEN, res.AuthToken);
    this.localStorageService.setData(this.X_REFRESH_TOKEN, res.RefreshToken);
  }

  private storeAuthToken(token) {
    this.localStorageService.setData(this.X_AUTH_TOKEN, token);
  }

  getRefreshToken() {
    return this.localStorageService.getData(this.X_REFRESH_TOKEN);
  }

  private removeTokens() {
    this.localStorageService.removeItem(this.X_AUTH_TOKEN);
    this.localStorageService.removeItem(this.X_REFRESH_TOKEN);
  }
}
