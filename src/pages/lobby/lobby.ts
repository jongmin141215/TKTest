import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { HistoryPage } from '../history/history';
import { AppUserProvider } from '../../providers/app-user/app-user';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-lobby',
  templateUrl: 'lobby.html',
})
export class LobbyPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appUserProvider: AppUserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LobbyPage');
  }

  takeTest() {
    this.navCtrl.push(QuestionPage);
  }
  viewMyHistory() {
    this.navCtrl.push(HistoryPage);
  }
  logout() {
    this.appUserProvider.logout(window.localStorage.getItem('token'));
    this.navCtrl.setRoot(LoginPage);
  }
}
