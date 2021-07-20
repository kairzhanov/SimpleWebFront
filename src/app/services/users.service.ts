import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getAllUsers() {
    return this.http.get<User[]>(`${environment.backend}users`);
  }

  public GetUser(userId: number) {
    return this.http.get<User>(`${environment.backend}users/${userId}`);
  }

  public CreateUser(user: User) {
    return this.http.post<User>(`${environment.backend}users`, user);
  }

  public UpdateUser(user: User) {
    return this.http.put<User>(`${environment.backend}users/${user.userId}`, user);
  }

  public DeleteUser(userId: number) {
    return this.http.delete(`${environment.backend}users/${userId}`);
  }
}
