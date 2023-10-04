import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/services/config.service';

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

  checkEmailAvailability(email: string): Observable<any>{
    const params = new HttpParams().set('email', email);
    return this.http.post(
      this.backendApi + '/api/v1/school-app/check-email',
      null,
      { params }
    );
  }

  forgotPassword(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(
      this.backendApi + '/api/v1/school-app/password/forgot',
      params,
      { observe: 'response' }
    );
  }

  checkToken(token:string): Observable<any> {
    const params = new HttpParams().set('token', token);
    return this.http.post(
      this.backendApi + '/api/v1/school-app/password/check-token',
      params,
      { responseType: 'json' }
    );
  }

  changePassword(newPassword: string, newPasswordConfirm: string, token: string): Observable<any> {
    const Options = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token}),
      params: new HttpParams().set('token', token),
      responseType: 'json' as 'json'
    };
    return this.http.post(
      this.backendApi + '/api/v1/school-app/password/change',
      {
        newPassword,
        newPasswordConfirm,
      },
      Options
    );
  }
}
