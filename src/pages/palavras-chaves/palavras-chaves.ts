import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { KeywordsProvider } from '../../providers/keywords/keywords';
import { Keyword } from '../../models/keyword';

@Component({
  selector: 'page-palavras-chaves',
  templateUrl: 'palavras-chaves.html',
})
export class PalavrasChavesPage {

  lstKeywords: Keyword[];
  query: string;
  tap: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public keywords: KeywordsProvider) {

    this.query = '';
    this.tap = 0;
    const dataObservale = keywords.getO();
    dataObservale.subscribe((value) => {
      this.lstKeywords = value;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PalavrasChavesPage');
    /*this.keywords.get()
    .then((result) => {
      this.lstKeywords = result;
    });*/
  }

  tapEvent(e){
    this.tap++;
  }

}
