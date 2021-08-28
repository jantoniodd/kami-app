import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';
import { StandardError } from './standard-error';

@Injectable()
export class HttpService {
  static CONNECTION_REFUSE = 0;
  static UNAUTHORIZED = 401;
  static METHOD_ARGUMENT_NOT_VALID_EXCEPTION = 400;

  static APPLICATION_JSON = 'application/json';
  static APPLICATION_PDF = 'application/pdf';
  static APPLICATION_XLSX =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  private headers: HttpHeaders;
  private params: HttpParams;
  private responseType: string;

  private successfulNotification = undefined;
  private errorNotification = undefined;

  successful(notification = 'Successful'): HttpService {
    this.successfulNotification = notification;
    return this;
  }

  error(notification: string): HttpService {
    this.errorNotification = notification;
    return this;
  }

  constructor(private httpClient: HttpClient) {
    this.resetOptions();
  }

  private resetOptions() {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }

  private createOptions(): any {
    const options: any = {
      headers: this.headers,
      params: this.params,
      responseType: this.responseType,
      observe: 'response',
    };

    this.resetOptions();

    return options;
  }

  get(endPoint: string): Observable<any> {
    return this.httpClient.get(endPoint, this.createOptions()).pipe(
      map((response) => this.extractData(response)),
      catchError((error) => this.handleError(error))
    );
  }

  post(endPoint: string, body?: object): Observable<any> {
    return this.httpClient.post(endPoint, body, this.createOptions()).pipe(
      map((response) => this.extractData(response)),
      catchError((error) => this.handleError(error))
    );
  }

  put(endPoint: string, body?: object): Observable<any> {
    return this.httpClient.put(endPoint, body, this.createOptions()).pipe(
      map((response) => this.extractData(response)),
      catchError((error) => this.handleError(error))
    );
  }

  delete(endPoint: string): Observable<any> {
    return this.httpClient.delete(endPoint, this.createOptions()).pipe(
      map((response) => this.extractData(response)),
      catchError((error) => this.handleError(error))
    );
  }

  private extractData(response: any): any {
    const contentType: string = response.headers.get('content-type');

    if (contentType) {
      if (contentType.indexOf(HttpService.APPLICATION_PDF) !== -1) {
        const blob = new Blob([response.body], {
          type: HttpService.APPLICATION_PDF,
        });
        window.open(window.URL.createObjectURL(blob));
      }

      if (contentType.indexOf(HttpService.APPLICATION_XLSX) !== -1) {
        const blob = new Blob([response.body], {
          type: HttpService.APPLICATION_XLSX,
        });
        window.open(window.URL.createObjectURL(blob));
      }

      if (contentType.indexOf(HttpService.APPLICATION_JSON) !== -1) {
        return response.body;
      }
    } else {
      return response;
    }
  }

  private handleError(response: any): any {
    let error: StandardError;

    if (response.status === HttpService.UNAUTHORIZED) {
      console.log('Unauthorized');
      return EMPTY;
    } else if (response.status === HttpService.CONNECTION_REFUSE) {
      console.log('Connection Refuse');
      return EMPTY;
    } else if (
      response.status === HttpService.METHOD_ARGUMENT_NOT_VALID_EXCEPTION
    ) {
      console.log(response.error);
      console.log('You must complete the required fields!');
      return EMPTY;
    } else {
      try {
        error = response.error;
        console.log(
          error.error + '  ( ' + response.status + ' ) ' + error.message
        );
        return throwError(error);
      } catch (error) {
        console.log('Not response');
        return throwError(response.error);
      }
    }
  }

  param(key: string, value: string): HttpService {
    if (value != null) {
      this.params = this.params.append(key, value);
    }
    return this;
  }

  pdf(): HttpService {
    this.responseType = 'blob';
    this.header('Accept', 'application/pdf , application/json');
    return this;
  }

  excel(): HttpService {
    this.responseType = 'blob';
    this.header('Accept', 'application/vnd.ms-excel, application/json');
    return this;
  }

  header(key: string, value: string): HttpService {
    if (value != null) {
      this.headers = this.headers.append(key, value); // This class is immutable
    }
    return this;
  }

  authBasic(usuario: string, password: string): HttpService {
    return this.header(
      'Authorization',
      'Basic ' + btoa(usuario + ':' + password)
    );
  }
}
