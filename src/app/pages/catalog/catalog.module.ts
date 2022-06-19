import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatalogComponent} from './catalog.component';
import {CatalogCategoryComponent} from './components/catalog-category/catalog-category.component';
import {CatalogProductComponent} from './components/catalog-product/catalog-product.component';
import {CatalogSearchComponent} from './components/catalog-search/catalog-search.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {FooterModule} from '@shared/components/footer/footer.module';
import {FiltersModule} from '@shared/components/filters/filters.module';
import {ImageUrlPipeModule} from '@shared/pipes/image-url.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CatalogHeaderComponent} from './components/catalog-header/catalog-header.component';
import {ConnectFormModule} from '@shared/dialogs/connect-form/connect-form.module';
import {FiltersComponent} from "@shared/components/filters/filters.component";


@NgModule({
    declarations: [
        CatalogComponent,
        CatalogCategoryComponent,
        CatalogProductComponent,
        CatalogSearchComponent,
        CatalogHeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: CatalogComponent,
        }]),
        AngularSvgIconModule,
        FooterModule,
        FiltersModule,
        ImageUrlPipeModule,
        ReactiveFormsModule,
        ConnectFormModule,
    ],
    providers: [FiltersComponent]
})
export class CatalogModule {
}
