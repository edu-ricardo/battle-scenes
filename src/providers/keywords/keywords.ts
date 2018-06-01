import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Keyword } from "../../models/keyword";


import { Observable } from 'rxjs/Observable';
import { CacheService } from 'ionic-cache';
/*
  Generated class for the KeywordsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KeywordsProvider {

  constructor(public http: HttpClient, public cache: CacheService) {
    console.log('Hello KeywordsProvider Provider');
    cache.setDefaultTTL(60 * 60 * 24);
  }

  /**
   * Recupera as keywords
   */
  public get(): Promise<Keyword[]> {
    return new Promise<Keyword[]>((resolve, reject) => {
      this.http.get("http://104.236.125.240/api/Keywords?filter={\"order\":\"keyword+ASC\"}").toPromise()
        .then((value) => {
          resolve(value as Keyword[]);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  }

  public getO(): Observable<Keyword[]> {
    let result = this.http.get<Keyword[]>("http://104.236.125.240/api/Keywords?filter={\"order\":\"keyword+ASC\"}");
    return this.cache.loadFromObservable("http://104.236.125.240/api/Keywords",result);
  }  
}
