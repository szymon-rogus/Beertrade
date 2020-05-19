import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
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
