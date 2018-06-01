import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CardsProvider } from '../../providers/cards/cards';

import { Cards } from "../../models/simple-card";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'  
})
export class HomePage {
  
  all_cards: any;
  query: string;
  allcards: any[];

  constructor(public navCtrl: NavController, public cards: CardsProvider) {
      this.cards.getO().subscribe((value) => {
        this.all_cards = value;
      });  
      
  }

}
