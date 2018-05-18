import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CardsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CardsProvider Provider');
  }

  public get(): Promise<Object> {
    return this.http.get('http://104.236.125.240/api/cardsinfo').toPromise();
  }

}
