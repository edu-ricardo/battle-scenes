import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CardsProvider } from '../providers/cards/cards';

import { HttpClientModule } from '@angular/common/http'; 

import { CardsPage } from '../pages/cards/cards';
import { PalavrasChavesPage } from '../pages/palavras-chaves/palavras-chaves';
import { KeywordsProvider } from '../providers/keywords/keywords';

import { CacheModule } from "ionic-cache";
import { PipesModule } from '../pipes/pipes.module';

import { LoginPage } from '../pages/login/login';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { AuthService } from '../providers/auth-service/auth-service';

import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { SignupPage } from '../pages/signup/signup';
import { MyCardsProvider } from '../providers/my-cards/my-cards';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CardsPage,
    PalavrasChavesPage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    PipesModule,
    NgxErrorsModule,
    CacheModule.forRoot()
  ],
  exports:[
    CacheModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CardsPage, 
    LoginPage,
    PalavrasChavesPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CardsProvider,
    KeywordsProvider,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    MyCardsProvider
  ]
})
export class AppModule {}
