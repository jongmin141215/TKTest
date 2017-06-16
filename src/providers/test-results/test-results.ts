import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TestResultsProvider {

  constructor(public http: Http) {
    console.log('Hello TestResultsProvider Provider');
  }
  baseUrl: string = "http://localhost:3000/api";
  path: string = "/TestResults";

  saveTest(testAnswers, token) {
    return this.http.post(this.baseUrl + this.path + '?access_token=' + token, testAnswers);
  }
  getTests(userId) {
    return this.http.get(this.baseUrl + this.path + "?filter[where][userId]=" + userId)
  }

}
