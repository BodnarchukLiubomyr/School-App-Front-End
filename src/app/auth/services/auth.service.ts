import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ConfigService } from 'src/app/shared/services/config.service';

const AUTH_API = environment.authApi;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backendApi: string;

  constructor(
    private http: HttpClient,
    env: ConfigService)
  {
    this.backendApi = env.config.backendApi;
  }

  signUp(firstname: string,lastname: string,email: string, password: string, passwordConfirm: string): Observable<any> {
    return this.http.post(
      this.backendApi + '/api/v1/school-app/sign-up',
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
    return this.http.get(this.backendApi + '/api/v1/school-app/account/confirm/send-email/' + email,
    { observe: 'response' }
    );
  };

  confirmAccount(token: string): Observable<any> {
    return this.http.put(this.backendApi + '/api/v1/school-app/account/confirm/' + token,
    { responseType: 'json' });
  }

  logIn(email: string, password: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-app/log-in',
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
      this.backendApi + '/api/v1/school-app/password/forgot',
      null,
      { params }
    );
  }
}
