import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from './news.component';
import {IframeModule} from '../../shared/components/iframe/iframe.module';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        NewsComponent
    ],
    imports: [
        CommonModule,
        IframeModule,
        RouterModule.forChild([{
            path: '',
            component: NewsComponent,
        }]),
    ]
})
export class NewsModule {
}
