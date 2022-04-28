import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterModule,
    ],
    exports: [
        HeaderComponent
    ],
})
export class HeaderModule {
}
