import { NgModule } from '@angular/core';
import { FilterCardPipe } from './filter-card/filter-card';
import { FilterKeywordsPipe } from './filter-keywords/filter-keywords';
@NgModule({
	declarations: [FilterCardPipe,
    FilterKeywordsPipe],
	imports: [],
	exports: [FilterCardPipe,
    FilterKeywordsPipe]
})
export class PipesModule {}
