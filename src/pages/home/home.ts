import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CardsProvider } from '../../providers/cards/cards';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'  
})
export class HomePage {
  
  all_cards: any;
  query: string;
  allcards: any[];

  constructor(public navCtrl: NavController, public cards: CardsProvider) {
      this.cards.get().then((value) => {
        this.all_cards = value;
      });  
  }

}
