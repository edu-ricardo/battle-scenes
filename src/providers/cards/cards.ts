import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CacheService } from "ionic-cache";

import { Observable } from "rxjs/observable";
/*
  Generated class for the CardsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardsProvider {

  constructor(public http: HttpClient, private cache: CacheService) {
    console.log('Hello CardsProvider Provider');  
  }

  public get(): Promise<Object> {
    return this.http.get('http://104.236.125.240/api/cardsinfo').toPromise();
  }

  public getO(): Observable<Object> {
    let result = this.http.get('http://104.236.125.240/api/cardsinfo');
    return this.cache.loadFromObservable('http://104.236.125.240/api/cardsinfo',result);    
  }

}
