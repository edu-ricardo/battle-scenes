import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CardsProvider } from '../../providers/cards/cards';

import { Card } from "../../models/card";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'  
})
export class HomePage {
  
  all_cards: any;
  query: string;
  allcards: Card[];

  constructor(public navCtrl: NavController, public cards: CardsProvider) {
      this.cards.getO().subscribe((value) => {
        this.all_cards = value;                
      });  
      
  }

}
