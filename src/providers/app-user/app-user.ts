import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AppUserProvider {

  constructor(public http: Http) {
    console.log('Hello AppUserProvider Provider');
  }
  baseUrl: string = "http://localhost:3000/api";
  path: string = "/AppUsers";
  loginPath: string = "/AppUsers/login";

  register(newUserData) {
    return this.http.post(this.baseUrl + this.path,
    newUserData);
  }
  login(userData) {
    return this.http.post(this.baseUrl + this.loginPath, userData);
  }
}
