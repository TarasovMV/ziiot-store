import {ChangeDetectionStrategy, Component, DoCheck, OnInit} from '@angular/core';
import {FrameMessageService} from '../../core/services/frame-message.service';
import {IProduct} from '../../core/interfaces/product.inteface';
import {BehaviorSubject, filter, map, Observable, switchMap, tap} from 'rxjs';
import {ApiService} from '../../core/services/api.service';
import {PlatformService} from '../../core/services/platform.service';
import {ViewDetectorService} from '../../core/services/view-detector.service';
import {ImageUrlPipe} from '../../shared/pipes/image-url.pipe';
import {ActivatedRoute} from '@angular/router';

const DEFAULT_PATH = '1cnad';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [ImageUrlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit, DoCheck {
    readonly product$ = new BehaviorSubject<IProduct | null>(null);
    readonly pageSize$ = this.platformService.pageProductSize$;

    private get presentationUrl(): string | undefined {
        const product = this.product$.getValue();
        return product?.files.find(f => f.fileType === 3)?.path;
    }

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly platformService: PlatformService,
        private readonly viewDetector: ViewDetectorService,
        private readonly frameMessage: FrameMessageService,
        private readonly imageUrlPipe: ImageUrlPipe,
        private readonly api: ApiService,
    ) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.pipe(
            map(x => x.get('path') ?? DEFAULT_PATH),
            switchMap((productUrl: string) => this.api
                .getProducts()
                .pipe(map((products) => products.filter(({url}) => !!url).find(({url}) => url.search(productUrl) !== -1)?.id ?? 6))),
            switchMap((productId) => this.getProduct(productId))
        ).subscribe((x: any) => this.product$.next(x));
    }

    ngDoCheck() {
        this.viewDetector.setView();
    }

    openGallery(idx: number) {
        const dialogUrl = 'https://ziotstore.web.app/fullscreen-gallery';
        const data = {
            idx,
            images: this.product$.getValue()?.gallery?.map(x => this.imageUrlPipe.transform(x)) ?? [],
        }

        this.frameMessage.sendDialog(dialogUrl, data);
    }

    loadPresentation() {
        if (!this.presentationUrl) {
            return;
        }
        const payload = {
            type: 'load-presentation',
            body: {
                url: encodeURI(this.imageUrlPipe.transform(this.presentationUrl)),
            }
        }
        this.frameMessage.sendMessage(JSON.stringify(payload));
    }

    getCost() {
        const payload = {
            type: 'form-cost',
            body: {}
        }
        this.frameMessage.sendMessage(JSON.stringify(payload));
    }

    back() {
        const payload = {
            type: 'product-back',
            body: {}
        }
        this.frameMessage.sendMessage(JSON.stringify(payload));
    }

    private getProduct(id: number): Observable<IProduct> {
        return this.api.getFilters().pipe(
            switchMap(filters => this.api.getProduct(id).pipe(
                map(product => ({
                    ...product,
                    gallery: product?.files?.filter(x => x.fileType === 2)?.map(x => x.path) ?? [],
                    filters: product?.filters.map(x => ({
                            ...x,
                            name: filters.find(f => f.filterType === x.filterType && f.id === x.filterId)?.name
                        })).filter(x => !!x.name)
                })),
            ))
        ) as Observable<IProduct>;
    }
}
