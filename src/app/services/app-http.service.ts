import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Observer } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppHttpService {
  BASE_URL = environment.baseUrl;

  constructor(
    private http: HttpClient,
    public _localstorage: LocalStorageService,
    private router: Router
  ) {}

  static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An client side error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error.error || error);
  }

  callPostApi(apiurl: string, body: any) {
    return Observable.create((observer: Observer<any>) => {
      let header = new HttpHeaders();
      header = header.append('Content-Type', 'application/json');
      this.postRequest(this.BASE_URL + apiurl, body, header).subscribe(
        (response) => {
          observer.next(this.handleResponse(response));
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  private postRequest(apiurl, body, header) {
    return this.http
      .post(apiurl, body, {
        headers: header,
      })
      .pipe(catchError(AppHttpService.handleError));
  }

  handleResponse(response) {
    if (
      response.status_code === 200 ||
      response.status_code === 201 ||
      response.status_code === 202
    ) {
      return response;
    } else if (
      (response.status_code && response.status_code === 401) ||
      (response.statusCode && response.statusCode === 401)
    ) {
      this._localstorage.clearAll();
      this.router.navigateByUrl('login');
    } else {
      return null;
    }
  }
}
