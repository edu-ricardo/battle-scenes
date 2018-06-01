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
import { CardsPage } from '../pages/cards/cards';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CardsPage,
    FilterCardPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CardsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CardsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
