import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CacheService } from "ionic-cache";

import { Observable } from "rxjs/observable";
import { CardInfo, CardListItem } from '../../models/card';
import { Count } from '../../models/count';
/*
  Generated class for the CardsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const BASE_URI_CARDS = 'http://104.236.125.240/api/cardsinfo';
const BASE_URI_CARD = 'http://104.236.125.240/api/cards';

@Injectable()
export class CardsProvider {
  
  constructor(public http: HttpClient, private cache: CacheService) {
    console.log('Hello CardsProvider Provider');  
  }

  public getO(): Observable<CardInfo[]> {
    let result = this.http.get(BASE_URI_CARDS);
    return this.cache.loadFromObservable(BASE_URI_CARDS,result);    
  }

  public count():Observable<Count> {
    let result = this.http.get(BASE_URI_CARDS + '/count');
    return this.cache.loadFromObservable(BASE_URI_CARDS + '/count', result);
  }

  public get(limit?: number, skip?: number, order?: string, orderType?: string, where?: any):Observable<CardInfo[]>{
    let filterJson = {
      limit: limit,
      skip: skip,
      order: '', 
      where: ''
    };

    if (order) {      
      filterJson.order = order+' '+ (orderType || 'DESC');
    }

    if (where) {
      filterJson.where = where;
    }
    let filter_str = '?filter='+JSON.stringify(filterJson);
    let result = this.http.get<CardInfo[]>(BASE_URI_CARDS + filter_str);
    return this.cache.loadFromObservable(BASE_URI_CARDS + filter_str, result);
  }

  public getCardsFromList(idList: Array<string>, forceRefresher?: boolean):Observable<CardListItem[]>{
    let groupKey = 'mycards';
    let f = {
      where: {
        id: {
          inq: idList
        }
      }
    };
    if (forceRefresher) {
      this.cache.clearGroup(groupKey);
    }

    let uri = BASE_URI_CARD + '?filter='+JSON.stringify(f);
    let result = this.http.get<CardListItem[]>(uri);
    return this.cache.loadFromObservable(uri,result,groupKey);
  }
}
