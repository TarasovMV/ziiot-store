import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HeaderModule} from './shared/components/header/header.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TransferHttpCacheModule} from '@nguniversal/common';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        TransferHttpCacheModule,
        AppRoutingModule,
        HttpClientModule,
        AngularSvgIconModule.forRoot(),
        HeaderModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
