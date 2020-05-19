import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RegisterService} from "../services/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  login : string;

  password : string;

  firstName : string;

  lastName : string;

  email : string;

  phoneNumber : string;

  constructor(private router: Router, private registerService : RegisterService) { }

  ngOnInit(): void {
  }

  handleRegister() {
    this.registerService.handleRegister(this.login, this.password, this.firstName, this.lastName, this.email, this.phoneNumber)
      .subscribe()
  }

  handleBack() {
    this.router.navigate(['login'])
  }

}
