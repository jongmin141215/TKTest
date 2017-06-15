import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionsProvider {

  constructor(public http: Http) {
    console.log('Hello QuestionsProvider Provider');
  }
  baseUrl: string = "http://localhost:3000/api";
  path: string = "/Questions"

  getQuestions(token) {
    console.log('inside getQuestions');
    return this.http.get(this.baseUrl + this.path + '?access_token=' + token);
  }

}
