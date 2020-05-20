import { Component, OnInit, HostListener } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;
  showErrorMessage = false;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  handleRegister() {
    this.router.navigate(['register']);
  }

  handleLogin() {
    this.loginService.handleLogin(this.login, this.password).subscribe(data => {
        this.router.navigate(['home'])
      }, error => {
      if(error.error == "Invalid credentials")
        this.showErrorMessage = true;
    });
  }

  handleClick() {
    this.loginService.checkLogin().subscribe(response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error));
  }

  handleSuccessfulResponse(response) {
    console.log(response.message);
  }

  handleErrorResponse(response) {
    console.log(response);
  }

}
