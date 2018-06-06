import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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

  public limit: number;
  public skip: number;
  public page: number;
  public max_pages: number;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public navParams: NavParams, public cards_service: CardsProvider) {  
    cards_service.count().subscribe((count) => {
      this.count_cards = count.count;

      this.page = 1;
      this.skip = 0;
      this.limit = 20;

      this.max_pages = Math.ceil(this.count_cards / this.limit);
      this.loadCards();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardsPage');
  }

  loadCards(){
    this.cards_service.get(this.limit, this.skip)
    .subscribe((value) => {
      this.cards = value;

      this.cards.forEach(element => {
        CardUtils.getImagesUrl(element);
      });
    });
  }
  say(value?: any){
    console.log(value);
    let alert = this.alertCtrl.create({
      buttons: ['Ok'],
      title: 'Alter Ego',
      message: value
    });
    alert.present();
  }

  nextPage(){
    if (this.page == this.max_pages)
      return;
    this.page++;
    this.skip = (this.page - 1) * this.limit;
    this.cards.length = 0;
    
    this.loadCards();
  }

  previousPage(){
    if (this.page == 1)
      return;
    this.page--;
    this.skip = (this.page - 1) * this.limit;
    this.cards.length = 0;
    
    this.loadCards();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    if (this.page == this.max_pages)
      return;
    this.page++;
    this.skip = (this.page - 1) * this.limit;
  
    this.cards_service.get(this.limit, this.skip)
    .subscribe((value) => {  
      value.forEach(element => {
        CardUtils.getImagesUrl(element);

        this.cards.push(element);
        infiniteScroll.complete();
      });
    });
  }

}
