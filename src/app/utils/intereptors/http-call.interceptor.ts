import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

@Injectable()
export class HttpCallInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSuject: BehaviorSubject<any> = new BehaviorSubject<any>(
    []
  );

  constructor(public authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<any> {
    if (this.authService.getAuthToken()) {
      request = this.addToken(request, this.authService.getAuthToken());
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        X_AUTH_TOKEN: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSuject.next(null);
        return this.authService.refreshToken().pipe(
            switchMap((token: any) => {
                this.isRefreshing = false;
                this.refreshTokenSuject.next(token);
                return next.handle(this.addToken(request, token));
            }));
    } else {
        return this.refreshTokenSuject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(jwt => {
                return next.handle(this.addToken(request, jwt));
        }));
    }
}
}
