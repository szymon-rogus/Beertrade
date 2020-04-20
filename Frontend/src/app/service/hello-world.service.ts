import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MessageModel } from '../model/Message'

@Injectable({
  providedIn: 'root'
})

export class HelloWorldService {
  constructor(private http: HttpClient) {
  }
  executeHelloWorldService() {
      return this.http.get<MessageModel>('http://localhost:8080/greeting');
  }
}
