import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {RouterModule} from '@angular/router';
import {ProductCardModule} from './components/product-card/product-card.module';
import {CategoryCardModule} from './components/category-card/category-card.module';
import {FiltersModule} from '@shared/components/filters/filters.module';
import {SearchModule} from './components/search/search.module';
import {ImageUrlPipeModule} from '@shared/pipes/image-url.module';
import {FooterModule} from '@shared/components/footer/footer.module';


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
        SearchModule,
        ImageUrlPipeModule,
        FooterModule,
    ]
})
export class MainModule {
}
