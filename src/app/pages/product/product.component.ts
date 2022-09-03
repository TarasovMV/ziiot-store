import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IProduct} from '@core/interfaces/product.inteface';
import {BehaviorSubject, map, Observable, switchMap} from 'rxjs';
import {ApiService} from '@core/services/api.service';
import {PlatformService} from '@core/services/platform.service';
import {ImageUrlPipe} from '@shared/pipes/image-url.pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '@core/services/dialog.service';
import {ConnectFormComponent} from '@shared/dialogs/connect-form/connect-form.component';
import {SeoService} from "@core/services/seo.service";
import {FullscreenGalleryComponent} from '@shared/dialogs/fullscreen-gallery/fullscreen-gallery.component';

const DEFAULT_PATH = '1cnad';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [ImageUrlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
    readonly product$ = new BehaviorSubject<IProduct | null>(null);
    readonly pageSize$ = this.platformService.pageProductSize$;
    isRussian = false;

    private get presentationUrl(): string | undefined {
        const product = this.product$.getValue();
        return product?.files.find(f => f.fileType === 3)?.path;
    }

    constructor(
        private readonly dialog: DialogService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly platformService: PlatformService,
        private readonly imageUrlPipe: ImageUrlPipe,
        private readonly api: ApiService,
        private readonly seoService: SeoService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.isRussian = !this.router.url.startsWith("/en");
        this.activatedRoute.data.subscribe(data => {
            this.activatedRoute.paramMap.pipe(
                map(x => x.get('path') ?? DEFAULT_PATH),
                switchMap((productUrl: string) => this.api
                    .getProducts(data['language'])
                    .pipe(map((products) => products.filter(({url}) => !!url).find(({url}) => url.search(productUrl) !== -1)?.id ?? 6))),
                switchMap((productId) => this.getProduct(productId, data['language']))
            ).subscribe((x: any) => {
                console.log(x);
                this.seoService.setTitle(x.name);
                this.seoService.setDescription(x.description);
                this.seoService.setKeywords(x.keyWords);
                this.seoService.setUrl("https://ziiotstore.ru" + this.router.url);
                if (x.gallery.length > 0) {
                    this.seoService.setBackEndImage(x.gallery[0]);
                }
                this.product$.next(x);
            });
        });

    }

    openGallery(idx: number) {
        const data = {
            idx,
            images: this.product$.getValue()?.gallery?.map(x => this.imageUrlPipe.transform(x)) ?? [],
        }

        this.dialog.open(FullscreenGalleryComponent, data).subscribe();
    }

    loadPresentation() {
        if (!this.presentationUrl) {
            return;
        }
        window.open(encodeURI(this.imageUrlPipe.transform(this.presentationUrl)));
    }

    getCost() {
        this.dialog.open(ConnectFormComponent, {product: this.product$.getValue()?.name, type: '2'}).subscribe(x => console.log('close dialog', x));
    }

    back() {
        history.back();
    }

    private getProduct(id: number, language: string): Observable<IProduct> {
        return this.api.getFilters(language).pipe(
            switchMap(filters => this.api.getProduct(id, language).pipe(
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
