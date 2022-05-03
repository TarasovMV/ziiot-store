import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksComponent} from './tasks.component';
import {IframeModule} from '../../shared/components/iframe/iframe.module';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        TasksComponent
    ],
    imports: [
        CommonModule,
        IframeModule,
        RouterModule.forChild([{
            path: '',
            component: TasksComponent,
        }]),
    ]
})
export class TasksModule {
}
