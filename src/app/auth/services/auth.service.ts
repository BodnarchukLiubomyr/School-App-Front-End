import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const AUTH_API = environment.authApi;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(firstname: string,lastname: string,email: string, password: string, passwordConfirm: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'sign-up',
      {
        firstname,
        lastname,
        email,
        password,
        passwordConfirm
      },
      httpOptions
    );
  };

  sendConfirmEmail(email: string): Observable<any> {
    return this.http.get(AUTH_API + 'account/confirm/send-email/' + email);
  };

  confirmAccount(token: string): Observable<any> {
    return this.http.put(AUTH_API + 'account/confirm/' + token, { responseType: 'json' });
  }

  logIn(email: string, password: string): Observable<any>{
    return this.http.post(
      AUTH_API + 'log-in',
      {
        email,
        password
      },
      httpOptions
    );
  }

  forgotPassword(email: string): Observable<any>{
    const params = new HttpParams().set('email', email);
    return this.http.post(
      AUTH_API + 'password/forgot',
      null,
      { params }
    );
  }
}
