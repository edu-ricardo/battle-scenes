import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { dataMlab } from "../../config-mlab";
import { Observable } from 'rxjs/Rx';
import { MyCard } from '../../models/my-card';
import { CacheService } from 'ionic-cache';
/*
  Generated class for the MyCardsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyCardsProvider {

  constructor(public http: HttpClient, public cache: CacheService) {
    console.log('Hello MyCardsProvider Provider');
  }

  get():Observable<MyCard[]>{
    let uri = dataMlab.baseMlabApi + '/collections/cards?apiKey='+dataMlab.apiKey;
    let result = this.http.get<MyCard[]>(uri);
    return this.cache.loadFromObservable(uri, result);
  }

  getByUserId(uid: string):Observable<MyCard[]>{
    let uri = dataMlab.baseMlabApi + '/collections/cards?q={"uid": "'+uid+'"}&apiKey='+dataMlab.apiKey;
    let result = this.http.get<MyCard[]>(uri);
    return result;
  }

  post(card: MyCard):Observable<any>{
    let uri = dataMlab.baseMlabApi + '/collections/cards?apiKey='+dataMlab.apiKey;
    return this.http.post(uri, JSON.stringify(card), { headers: { 'Content-Type': 'application/json' }});
  }
}
