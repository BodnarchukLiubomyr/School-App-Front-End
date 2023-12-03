import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { ConfigService } from 'src/app/shared';
import { saveAs } from 'file-saver';

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

  getClassUsers(className: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-app/get-class-users/'+ className,
      {responseType: 'json'}
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

  getGroup(subjectId: string, userId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-app/get-group/'+subjectId+'/'+userId,
      { responseType: 'json'}
    )
  }

  getGroups(subjectId: string, userId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-app/get-groups/'+subjectId+'/'+userId,
      { responseType: 'json'}
    )
  }

  deleteGroup(groupName:string):Observable<any>{
    return this.http.delete(
      this.backendApi + '/api/v1/school-app/delete-group/'+groupName,
      {responseType:'json'}
    )
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

  deleteExerise(exerciseName:string):Observable<any>{
    return this.http.delete(
      this.backendApi + '/api/v1/school-app/delete-exercise/'+ exerciseName,
      {responseType:'json'}
    )
  }

  uploadFile(userId: string, exerciseId:string,token: string,file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(
      this.backendApi+ '/api/v1/school-app/files/upload/' + userId+'/'+ exerciseId,
      formData,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }),
        observe: 'response'
      }
    );
  }

  downloadFile(fileName: string): void{
   this.http.get(
      this.backendApi + '/api/v1/school-app/files/download/' + fileName,
      { responseType: 'blob' })
      .subscribe((response: Blob) => {
        saveAs(response, fileName);
      });
  }

  getFileWork(exerciseId: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-app/get-works/'+ exerciseId,
      {responseType: "json"}
    )
  }

  getTeacherFileWork(exerciseId: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-app/get-teacher-works/'+ exerciseId,
      {responseType: "json"}
    )
  }

  fileMarks(fileName: string, mark: string):Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-app/rate-file/'+ fileName,
      {mark: +mark},
      httpOptions
    )
  }

  getMark(userId: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-app/get-mark/'+ userId,
      {responseType: "json"}
    )
  }

  createChat(userId: string,lastname: string,firstname: string): Observable<any>{
    return this.http.post(
      this.backendApi + '/api/v1/school-app/create-chat/' + userId,
      {
        lastname,
        firstname
      },
      httpOptions
    );
  }

  getAllUserChats(userId: string): Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-app/get-chats/'+ userId,
      { responseType: "json"}
    );
  }

  getChatHistory(chatId: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-app/chat/'+chatId,
      {
        responseType: "json"
      }
    );
  }

  sendMessage(chatId: string, userId: string, content: string): Observable<any> {
    return this.http.post(this.backendApi+'/api/v1/school-app/send/'+ chatId +'/'+ userId,
    {
      content,
      observe: 'response'
    },
      httpOptions
    );
  }

  getGroupChatHistory(groupId: string):Observable<any>{
    return this.http.get(
      this.backendApi + '/api/v1/school-app/group-history/'+groupId,
      {
        responseType: "json"
      }
    );
  }

  sendGroupMessage(groupId: string, userId: string, content: string): Observable<any> {
    return this.http.post(this.backendApi+'/api/v1/school-app/group-send/'+ groupId +'/'+ userId,
    {
      content,
      observe: 'response'
    },
      httpOptions
    );
  }
}
