import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Credentials} from "../model/credentials";
import * as bcrypt from 'bcryptjs';
import {map} from 'rxjs/operators';
import {HelloBean} from "../model/hellobean";

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  credentials: Credentials;

  constructor(private http: HttpClient) {
  }

  handleLogin(login, password) {

    this.credentials = new Credentials(login, password);

    return this.http.post<any>(
      'http://localhost:8080/login', this.credentials).pipe(map(data => {
          sessionStorage.setItem(AUTHENTICATED_USER, login);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }));
  }

  checkLogin() {
    return this.http.get<HelloBean>('http://localhost:8080/login');
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

}
