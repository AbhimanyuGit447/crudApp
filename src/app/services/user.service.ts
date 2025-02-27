import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:3000/users";

  //get the users
  getUsers() : Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  //add the user

  addUser(user : any) : Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
  //update the user

  updateUser(id: any, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
