import { HttpHeaders, HttpClient } from '@angular/common/http';

export abstract class AbstractService {

  protected url: string = null;
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  protected constructor(protected http: HttpClient, urlPattern: string) {
    this.url = "http://localhost:8080/" + urlPattern;
  }

}