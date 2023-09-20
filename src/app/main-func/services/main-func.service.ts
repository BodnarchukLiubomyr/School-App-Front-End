import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MainFuncService {

  backendApi: string;

  constructor(
    private http: HttpClient,
    env: ConfigService)
  {
    this.backendApi = env.config.backendApi;
  }

  deleteUser(email: string, token: string): Observable<any>{
    return this.http.delete(
      this.backendApi + '/api/v1/school-app/delete-user/' + email,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }),
        responseType: 'json'
      }
    );
  }
}
