import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ResultsPage } from '../results/results';
import { TestResultsProvider } from '../../providers/test-results/test-results';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  tests: any = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public testResultsProvider: TestResultsProvider) {
  }

  ionViewDidLoad() {
    this.testResultsProvider.getTests(window.localStorage.getItem('userId'))
      .map(res => res.json())
      .subscribe(
        res => {
          this.tests = res;
        }, error => {
          console.log(error);
          alert("Something went wrong!");
        }
      )

  }
  goToResult(test) {
    this.navCtrl.push(ResultsPage, {
      test: test
    });
  }
}
