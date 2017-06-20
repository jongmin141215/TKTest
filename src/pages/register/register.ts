import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppUserProvider } from '../../providers/app-user/app-user';
import { LobbyPage } from '../lobby/lobby';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appUserProvider: AppUserProvider) {
  }
  user: any = {};

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  signupForm(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return alert("Please fill in all of the required fields.");
    } else {
      this.appUserProvider.register(this.user)
        .map(res => res.json())
        .subscribe(
          res => {
            alert('User Created Successfully')
            window.localStorage.setItem('token', res["token"]);
            window.localStorage.setItem('userId', res["id"]);
            console.log(res);
            this.navCtrl.push(LobbyPage)
          }, error => {
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
