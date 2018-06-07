import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MyCardsProvider } from '../../providers/my-cards/my-cards';
import { CardsProvider } from '../../providers/cards/cards';
import { AuthService } from '../../providers/auth-service/auth-service';
import { CardListItem } from '../../models/card';

/**
 * Generated class for the MyCardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-cards',
  templateUrl: 'my-cards.html',
})
export class MyCardsPage {

  public myCards: CardListItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mycardsService: MyCardsProvider, public cardsProvider: CardsProvider,
    public loadCtrl: LoadingController, public auth: AuthService
  ) {
    let loader = loadCtrl.create();
    loader.present();

    mycardsService.getByUserId(auth.Id).subscribe((value) => {
      let cids = new Array<string>();
      for (let index = 0; index < value.length; index++) {
        const element = value[index];
        cids.push(element.cardId);
      }

      cardsProvider.getCardsFromList(cids).subscribe((values) => {
        this.myCards = values;
        loader.dismiss();
      });
    });
  }


  doRefresh(refresher) { 
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCardsPage');
  }

}
