import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppUserProvider } from '../../providers/app-user/app-user';
import { LobbyPage } from '../lobby/lobby';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appUserProvider: AppUserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(form: NgForm) {
    if (form.invalid) {
      return alert("Please fill in all of the required fields.");
    } else {
      this.appUserProvider.login(form.value)
        .map(res => res.json())
        .subscribe(
          res => {
            window.localStorage.setItem("token", res["id"]);
            window.localStorage.setItem("userId", res["userId"]);
            this.navCtrl.setRoot(LobbyPage);
          },
          error => {
            switch(error["status"]) {
              case 400:
                alert("Bad request");
                break;
              case 401:
                alert("Unauthorized");
                break;
              case 404:
                alert("Page not found");
                break;
              case 422:
                alert("Unprocessable entity");
                break;
              case 500:
                alert("Internal server error");
                break;
              default:
                alert("Something went wrong");
            }
          }
        )
    }
  }

}
