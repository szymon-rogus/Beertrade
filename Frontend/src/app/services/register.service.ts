import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from '../model/user';
 
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  user : User;
 
  constructor(private http: HttpClient) { }
 
  handleRegister(login, password, firstName, lastName, email, phoneNumber) {
    login = btoa(login)
    const salt = bcrypt.genSaltSync(10);
    password = btoa(bcrypt.hashSync(password, salt))
    firstName = btoa(firstName)
    lastName = btoa(lastName)
    email = btoa(email)
    phoneNumber = btoa(phoneNumber)

    this.user = new User(login, password, firstName, lastName, email, phoneNumber);

    console.log('Tutaj')
    return this.http.post<User>(
      'http://localhost:8080/register',this.user, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
    
      });
  }
 
}