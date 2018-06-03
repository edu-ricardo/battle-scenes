import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CacheService } from "ionic-cache";

import { Observable } from "rxjs/observable";
import { Card } from '../../models/card';
import { Count } from '../../models/count';
/*
  Generated class for the CardsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const BASE_URI_CARDS = 'http://104.236.125.240/api/cardsinfo';

@Injectable()
export class CardsProvider {
  
  constructor(public http: HttpClient, private cache: CacheService) {
    console.log('Hello CardsProvider Provider');  
  }

  public getO(): Observable<Card[]> {
    let result = this.http.get(BASE_URI_CARDS);
    return this.cache.loadFromObservable(BASE_URI_CARDS,result);    
  }

  /**
   * count
   */
  public count():Observable<Count> {
    let result = this.http.get(BASE_URI_CARDS + '/count');
    return this.cache.loadFromObservable(BASE_URI_CARDS + '/count', result);
  }

  public get(limit?: number, skip?: number):Observable<Card[]>{
    let filter_str = '?filter[limit]='+limit+'&filter[skip]='+skip;
    let result = this.http.get<Card[]>(BASE_URI_CARDS + filter_str);
    return this.cache.loadFromObservable(BASE_URI_CARDS + filter_str, result);
  }
}
