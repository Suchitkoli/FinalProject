import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url='https://localhost:44329/Api/User'
  constructor(private http:HttpClient) { }

  getAllUser():Observable<User[]>{
    return this.http.get<User[]>(this.url+'/AllUserDetails')
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.url + '/GetUserDetailsById/' + id);
  }

  createUser(user: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    
    return this.http.post<User>(   this.url + '/PostUser/', user, httpOptions);
  }

  updateUser(user: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<User>(this.url + '/UpdateUserDetails/', user, httpOptions);
  }

  deleteUserById(id:string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/DeleteUserDetails?id=' + id, httpOptions);
  }




}
