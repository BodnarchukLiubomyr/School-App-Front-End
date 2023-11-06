import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
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

  createClass(classNumber: string, classLetter: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-app/create-class',
      {
        classNumber,
        classLetter
      },
      httpOptions
    );
  }

  addUserToClass(email: string,className: string):Observable<any>{
    const params = new HttpParams()
    .set('email', email)
    .set('className', className);
    return this.http.post(
      this.backendApi + '/api/v1/school-app/add-user-to-class',
      null,
      { params, observe: 'response' }
    );
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

  transferUsersToNextClass(): Observable<any>{
    return this.http.put(
      this.backendApi+'/api/v1/school-app/transfer-users',
      { observe: 'response' }
    );
  }

  createSubject(subjectName: string, email: string, className: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-app/create-subject',
      {
        subjectName,
        email,
        className
      },
      httpOptions
    );
  }

  getSubjects(userId: string, token: string): Observable<any> {
    return this.http.get(
      this.backendApi + '/api/v1/school-app/get-subjects/'+userId,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }),
        responseType: 'json'
      }
    );
  }

  createGroup(groupName: string,subjectName: string,className: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-app/create-group',
      {
        groupName,
        subjectName,
        className
      },
      httpOptions
    );
  }

  addUserToGroup(groupName: string,email: string, className:string):Observable<any>{
    const params = new HttpParams()
    .set('groupName', groupName)
    .set('email', email)
    .set('className',className);
    return this.http.post(
      this.backendApi + '/api/v1/school-app/add-user-to-group',
      null,
      { params, observe: 'response' }
    );
  }

  createExercise(name:string,description: string, date: string, className: string, subjectName: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-app/create-exercise',
      {
        name,
        description,
        date,
        className,
        subjectName
      },
      httpOptions
    );
  }

  getExercises(subjectId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-app/get-exercises/'+subjectId,
      { responseType: 'json' }
    )
  }
}
