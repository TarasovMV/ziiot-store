import {
    ChangeDetectionStrategy,
    Component, HostListener,
    ViewChild,
} from '@angular/core';
import {ViewContainerDirective} from '../../directives/view-container.directive';


@Component({
    selector: 'app-dialog-wrapper',
    templateUrl: './dialog-wrapper.component.html',
    styleUrls: ['./dialog-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogWrapperComponent {
    @ViewChild(ViewContainerDirective, {static: true}) host!: ViewContainerDirective;

    // @HostListener('window:popstate', ['$event'])
    // onPopState(event: Event) {
    //     console.log('Back button pressed');
    // }
}
