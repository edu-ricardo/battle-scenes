import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CardsPage } from '../pages/cards/cards';
import { PalavrasChavesPage } from '../pages/palavras-chaves/palavras-chaves';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service/auth-service';
import * as firebase from 'firebase/app';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;// HomePage;
  user: firebase.User;
  pages: Array<{title: string, component: any, authNeed?: boolean}>;

  constructor(public platform: Platform, public menu: MenuController,public statusBar: StatusBar, public splashScreen: SplashScreen, public auth: AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Cards', component: CardsPage },
      { title: 'Lista 1', component: ListPage, authNeed: true },
      { title: 'Palavras Chaves', component: PalavrasChavesPage }
    ];    
  }

  canShowLink(p:{title: string, component: any, authNeed?: boolean}):boolean{
    return (!p.authNeed) || (p.authNeed && this.auth.authenticated);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.auth.afAuth.authState
    .subscribe(
      user => {
        if (user) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      },
      () => {
        this.rootPage = LoginPage;
      }
    );    
  }

  logout(){
    this.auth.signOut();
    this.menu.close();
    this.nav.setRoot(LoginPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
