import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${environment.api_user_endpoint}/User`;
  constructor(private http: HttpClient) { }

  getAllUser(): Observable<User[]> {
    const url=environment.api_user_endpoint +`/User/AllUserDetails`;
    return this.http.get<User[]>(url)
  }

  getUserById(id: string): Observable<User> {
    const url = environment.api_user_endpoint + `/User/GetUserDetailsById/${id}`;
    return this.http.get<User>(url);
  }

  createUser(user: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.post<User>(this.url + '/PostUser/', user, httpOptions);
  }

  updateUser(user: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<User>(this.url + '/UpdateUserDetails/', user, httpOptions);
  }

  deleteUserById(id: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/DeleteUserDetails?id=' + id, httpOptions);
  }




}
