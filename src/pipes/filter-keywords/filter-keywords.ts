import { Pipe, PipeTransform } from '@angular/core';
import { Keyword } from '../../models/keyword';

/**
 * Generated class for the FilterKeywordsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filterKeywords',
})
export class FilterKeywordsPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(keywords: Keyword[], q: string) {
    return (keywords || []).filter(k => k.keyword.toLowerCase().includes(q.toLowerCase()))
  }
}
