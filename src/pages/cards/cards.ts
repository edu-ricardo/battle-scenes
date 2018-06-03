import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CardsProvider } from '../../providers/cards/cards';
import { Card, CardUtils } from '../../models/card';

/**
 * Generated class for the CardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})
export class CardsPage {

  public cards: Array<Card>;
  public count_cards: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cards_service: CardsProvider) {
    cards_service.getO().subscribe((value) => {
      this.cards = value;

      this.cards.forEach(element => {
        CardUtils.getImagesUrl(element); 
      });
    });

    cards_service.count().subscribe((count) => {
      this.count_cards = count.count;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardsPage');
  }

}
