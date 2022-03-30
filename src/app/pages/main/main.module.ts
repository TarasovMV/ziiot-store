import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {RouterModule} from '@angular/router';
import {ProductCardModule} from '../../shared/components/product-card/product-card.module';
import {CategoryCardModule} from '../../shared/components/category-card/category-card.module';
import {FiltersModule} from '../../shared/components/filters/filters.module';
import {SearchModule} from '../../shared/components/search/search.module';


@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        ProductCardModule,

        RouterModule.forChild([{
            path: '',
            component: MainComponent,
        }]),
        CategoryCardModule,
        FiltersModule,
        SearchModule
    ]
})
export class MainModule {
}
