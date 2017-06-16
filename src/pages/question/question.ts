import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

import { LobbyPage } from '../lobby/lobby';
import { ResultsPage } from '../results/results';
import { QuestionsProvider } from '../../providers/questions/questions';
import { TestResultsProvider } from '../../providers/test-results/test-results';

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  questions: any = [];
  @ViewChild(Slides) slides: Slides;
  testAnswers: any = {};
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public questionsProvider: QuestionsProvider,
    public testResultsProvider: TestResultsProvider) {
      this.questionsProvider.getQuestions(window.localStorage.getItem('token'))
        .map(res => res.json())
        .subscribe(
          res => {
            console.log(res);
            let apiQuestions = res;
            for(let singleQuestion of apiQuestions) {
              if (!this.questions[singleQuestion.Question_Number - 1]) {
                this.questions[singleQuestion.Question_Number - 1] = {};
              }
              this.questions[singleQuestion.Question_Number - 1][singleQuestion["Answer_ID"]] = singleQuestion;
            }
          }, error => {
            console.log("error");
            console.log(error);
            alert("Something went wrong!");
          }
        )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
    this.slides.lockSwipes(true);
    this.testAnswers = {
      "Avoiding": 0,
      "Accommodating": 0,
      "Compromising": 0,
      "Competing": 0,
      "Collaborating": 0
    }
  }

  nextSlide(option) {
    if (this.slides.getActiveIndex() + 1 !== 30 ) {
      this.testAnswers[option.Style]++;
      this.slides.lockSwipes(false);
      // this.slides.slideNext();
      this.slides.slideTo(this.slides.getActiveIndex() + 1);
      this.slides.lockSwipes(true);
    } else {

      // let tests: any = JSON.parse(window.localStorage.getItem("tests")) || [];
      this.testAnswers.createDate = new Date().toISOString();
      this.testAnswers["userId"] = window.localStorage.getItem('userId');
      this.testResultsProvider.saveTest(this.testAnswers, window.localStorage.getItem('token'))
        .map(res => res.json())
        .subscribe(
          res => {
            console.log(res);
            this.navCtrl.setRoot(ResultsPage, {
              test: this.testAnswers,
              showHome: true
            })
          }, error => {
            console.log(error)
            alert("Something went wrong");
          }
        )
      // tests.push(this.testAnswers);
      // window.localStorage.setItem("tests", JSON.stringify(tests));
      // this.navCtrl.setRoot(LobbyPage);

    }
  }




}
