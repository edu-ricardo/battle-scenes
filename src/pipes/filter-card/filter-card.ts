import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterCardPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filterCard',
})
export class FilterCardPipe implements PipeTransform {
  transform(cards: any[], searchText: string) {
      searchText = searchText || '';
      //return (cards || []).filter(c => (c.name.indexOf(value) != -1));      
      return (cards || []).filter( it => {
        return it.name.toLowerCase().includes(searchText.toLowerCase());
      });
  }
}
