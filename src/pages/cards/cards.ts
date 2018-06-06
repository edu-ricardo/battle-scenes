import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, AlertButton } from 'ionic-angular';
import { CardsProvider } from '../../providers/cards/cards';
import { CardInfo, CardUtils } from '../../models/card';
import { AuthService } from '../../providers/auth-service/auth-service';
import { MyCard } from '../../models/my-card';
import { MyCardsProvider } from '../../providers/my-cards/my-cards';

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

  public cards: Array<CardInfo>;
  public count_cards: number;

  public limit: number;
  public skip: number;
  public page: number;
  public max_pages: number;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public navParams: NavParams, 
    public cards_service: CardsProvider, 
    public auth: AuthService,
    public cardService: MyCardsProvider,
    public toastCtrl: ToastController) {  
    
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

  addToMyCards(card: CardInfo){
    let mycard = new MyCard();

    if(card.card_list.length == 1){
      mycard.cardId = card.main_cardId;
      mycard.uid = this.auth.Id;
      
      let toast = this.toastCtrl.create({
        message: 'Card '+card.name+' adicionado aos Meus Cards',
        duration: 3000
      });
  
      this.cardService.post(mycard).subscribe((obs) => {
        toast.present();
      });    
    }else{
      let opcoes = new Array<AlertButton>();
      for (let index = 0; index < card.card_list.length; index++) {
        const element = card.card_list[index];        
        opcoes.push({
          text: element.code,
          handler: () => {
            mycard.cardId = element.id;
            mycard.uid = this.auth.Id;
            
            let toast = this.toastCtrl.create({
              message: 'Card '+card.name+' adicionado aos Meus Cards',
              duration: 3000
            });
        
            this.cardService.post(mycard).subscribe((obs) => {
              toast.present();
            });   
          }
        });
      }
      let alert = this.alertCtrl.create({
        buttons: opcoes,
        title: 'Selecionar card',
        message: 'Esse card tem mais de uma versão. escolha a sua.'
      });

      alert.present();
    }
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
