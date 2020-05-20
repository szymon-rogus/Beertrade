import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from '../model/user';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends AbstractService{

  user : User;
  private static URL = "register";

  constructor(protected http: HttpClient) {
    super(http, RegisterService.URL)
  }

  handleRegister(login, password, firstName, lastName, email, phoneNumber) {
    login = btoa(login);
    const salt = bcrypt.genSaltSync(10);
    password = btoa(bcrypt.hashSync(password, salt));
    firstName = btoa(firstName);
    lastName = btoa(lastName);
    email = btoa(email);
    phoneNumber = btoa(phoneNumber);

    this.user = new User(login, password, firstName, lastName, email, phoneNumber);

    return this.http.post<User>(this.url,this.user, this.httpOptions);
  }

}
