import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LobbyPage } from '../lobby/lobby';
import Chart from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  result: any = {};
  barChart: any;
  @ViewChild('barCanvas') barCanvas;
  showHome: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  toLobby() {
    this.navCtrl.setRoot(LobbyPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
    this.result = this.navParams.get('test');
    this.showHome = this.navParams.get('showHome');
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Avoding', 'Accommodating', 'Compromising', 'Competing', 'Collaborating'],
        datasets: [{
          data: [
            this.result.Avoiding / 12 * 100,
            this.result.Accommodating / 12 * 100,
            this.result.Compromising / 12 * 100,
            this.result.Competing / 12 * 100,
            this.result.Collaborating / 12 * 100
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
           'rgba(54, 162, 235, 1)',
           'rgba(255, 206, 86, 1)',
           'rgba(75, 192, 192, 1)',
           'rgba(153, 102, 255, 1)'
         ],
         borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        roolripa: {
          enabled: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 100
            }
          }]
        }
      }
    })
  }

}
