import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RegisterService} from "../services/register.service";
import { FormGroup, Validators, FormControl } from '@angular/forms';

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

  showErrorMessage = false;
  showSuccessMessage = false;

  constructor(private router: Router, private registerService : RegisterService) { }

  ngOnInit(): void {
  }

  handleRegister() {
    this.registerService.handleRegister(this.login, this.password, this.firstName, this.lastName, this.email, this.phoneNumber)
      .subscribe(data => {
        console.log(data);
        this.showSuccessMessage = true;
      }, error => {
        console.log(error);
        this.showErrorMessage = true;
    });
  }

  handleBack() {
    this.router.navigate(['login'])
  }

}