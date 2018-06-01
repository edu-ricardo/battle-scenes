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
import { FilterCardPipe } from '../pipes/filter-card/filter-card';
import { PalavrasChavesPage } from '../pages/palavras-chaves/palavras-chaves';
import { KeywordsProvider } from '../providers/keywords/keywords';
import { FilterKeywordsPipe } from '../pipes/filter-keywords/filter-keywords';

import { CacheModule } from "ionic-cache";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PalavrasChavesPage,
    FilterCardPipe,
    FilterKeywordsPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
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
    PalavrasChavesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CardsProvider,
    KeywordsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
