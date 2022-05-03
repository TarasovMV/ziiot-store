import {ApplicationRef, createNgModuleRef, Injectable, Injector, Type, ViewContainerRef} from '@angular/core';
import {DialogWrapperComponent} from '../components/dialog-wrapper/dialog-wrapper.component';
import {DialogWrapperModule} from '../components/dialog-wrapper/dialog-wrapper.module';
import {fromEvent, Observable, Subject, takeUntil} from 'rxjs';
import {DIALOG} from '../tokens';
import {Dialog} from '../interfaces/dialog.interface';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    private readonly rootComponent = this.applicationRef.components[0];
    private readonly rootContainer = this.rootComponent.injector.get(ViewContainerRef);

    constructor(private readonly applicationRef: ApplicationRef, public injector: Injector) {
        this.rootComponent.location.nativeElement.style = 'position: relative; z-index: 0;'
    }

    open<T, C, D>(componentType: Type<C>, data?: D, injector?: Injector): Observable<T | undefined> {
        const moduleRef = createNgModuleRef(DialogWrapperModule, this.injector);
        const result$ = new Subject<T | undefined>();
        const wrapper = this.rootContainer.createComponent(DialogWrapperComponent, {
            ngModuleRef: moduleRef,
            injector: Injector.create({
                providers: [{
                    provide: DIALOG,
                    useValue: {
                        close: (res?: T) => {
                            wrapper.destroy();
                            result$.next(res);
                            result$.complete();
                        },
                        data
                    } as Dialog<D, T>,
                }],
                parent: injector ?? this.injector,
            })
        });
        history.pushState({state: 'fake'}, 'fake');
        fromEvent(window, 'popstate').pipe(takeUntil(result$)).subscribe(() => {
            wrapper.destroy();
            result$.next(undefined);
            result$.complete();
        });
        wrapper.instance.host.viewContainerRef.createComponent(componentType);
        return result$;
    }
}
