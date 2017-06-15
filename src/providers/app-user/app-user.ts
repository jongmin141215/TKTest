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

  register(newUserData) {
    return this.http.post(this.baseUrl + this.path,
    newUserData);
  }
  login(userData) {
    return this.http.post(this.baseUrl + this.path + '/login', userData);
  }
  logout(token) {
    console.log(token)
    return this.http.post(this.baseUrl + this.path + '/logout?access_token=' + token, {});
  }
}
