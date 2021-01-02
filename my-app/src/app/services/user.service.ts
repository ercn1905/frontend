import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../classes/user';
import { Observable, of, Observer } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'api/users'

  constructor(
    private http: HttpClient
  ) { }

  register(user: User): Observable<User>{
    return this.http.post<User>(this.userUrl,user);
  }

  updateUser(user: User): Observable<User>{
    return this.http.put<User>(this.userUrl,user);
  }

  getUser(username: string): Observable<User>{
    return this.http.get<User>(`${this.userUrl}/?username=${username}`);
  }

  getUserById(user: User): Observable<User>{
    return this.http.get<User>(`${this.userUrl}/?id=${user.id}`);
  }

}
