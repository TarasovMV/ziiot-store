import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonalPolicyComponent} from './personal-policy.component';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        PersonalPolicyComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: PersonalPolicyComponent,
        }]),
    ]
})
export class PersonalPolicyModule {
}
