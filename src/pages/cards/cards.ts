import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, AlertButton, LoadingController, FabContainer } from 'ionic-angular';
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

  public order: string;
  public orderType: string = 'DESC';

  public typeCard: string;
  public nameCard: string;

  public where: {name?: any, type?: any, or?: any} = {};

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public navParams: NavParams, 
    public cards_service: CardsProvider, 
    public loadCtrl: LoadingController,
    public auth: AuthService,
    public cardService: MyCardsProvider,
    public toastCtrl: ToastController) {  
    
    cards_service.count().subscribe((count) => {
      this.page = 1;
      this.skip = 0;
      this.limit = 20;

      this.count_cards = count.count;
      this.max_pages = Math.ceil(this.count_cards / this.limit);
      this.loadCards();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardsPage');
  }

  loadCards(){
    let load = this.loadCtrl.create({
      content: 'Carregando'
    });

    load.present();
    this.cards_service.get(this.limit, this.skip, this.order, this.orderType, this.where)
    .subscribe((value) => {
      this.cards = value;

      this.cards.forEach(element => {
        CardUtils.getImagesUrl(element);
      });

      load.dismiss();
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
  
    this.cards_service.get(this.limit, this.skip, this.order, this.orderType, this.where)
    .subscribe((value) => {  
      value.forEach(element => {
        CardUtils.getImagesUrl(element);

        this.cards.push(element);
        infiniteScroll.complete();
      });
    });
  }

  changeOrder(newOrder: string, fab: FabContainer){
    if (newOrder == this.order) {
      if (this.orderType == 'DESC') {
        this.orderType = 'ASC';
      } else {
        this.orderType = 'DESC';
      }
    } else{
      this.orderType = 'DESC';
    }
    
    this.order = newOrder;
    this.page = 1;
    this.skip = 0;
    this.cards.length = 0;
    this.loadCards();
    fab.close();
  }

  aplicarFiltros(){
    this.where = {};
    if (this.nameCard) {
      this.where.or = [
        { name: {
            like: this.nameCard
          }
        },
        { alter_ego: {
            like: this.nameCard
          }
        }];
    }
    if (this.typeCard) {
      this.where.type = {
        like: this.typeCard
      };
    }

    if (this.where != {}) {
      this.page = 1;
      this.skip = 0;
      this.cards.length = 0;
      this.loadCards(); 
    }
  }

  clearFilters(){
    this.where = {};
    this.typeCard = '';
    this.nameCard = '';
    this.page = 1;
    this.skip = 0;
    this.cards.length = 0;
    this.loadCards();
  }
}
