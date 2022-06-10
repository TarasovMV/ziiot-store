import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ProductDirection, ProductType} from '@core/enums';
import {DataService} from '@core/services/data.service';
import {IProductCard} from '@core/interfaces/product-card.interface';
import {BehaviorSubject, combineLatest, filter, map, takeUntil, tap} from 'rxjs';
import {FrameMessageService} from '@core/services/frame-message.service';
import {ImageUrlPipe} from '@shared/pipes/image-url.pipe';
import {DialogService} from '@core/services/dialog.service';
import {ConnectFormComponent} from '@shared/dialogs/connect-form/connect-form.component';
import {DestroyService} from '@core/services/destroy.service';
import {PlatformService} from '@core/services/platform.service';


@Component({
    selector: 'app-gantt-map',
    templateUrl: './gantt-map.component.html',
    styleUrls: ['./gantt-map.component.scss'],
    providers: [ImageUrlPipe, DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttMapComponent implements OnInit {
    readonly productDirection = ProductDirection;

    readonly data$ = new BehaviorSubject<{title: string, type: ProductType, table: {type: 'fill' | 'empty', size: number, product?: IProductCard}[][]}[]>([
        {
            title: 'SCM',
            type: ProductType.SCM,
            table: [[]]
        },
        {
            title: 'MES',
            type: ProductType.MES,
            table: [[]]
        },
        {
            title: 'ZIIoT',
            type: ProductType.ZIIoT,
            table: [[]]
        },
        {
            title: 'КИПиА',
            type: ProductType.KIPiA,
            table: [[]]
        },
    ]);

    readonly mobileFilter$ = new BehaviorSubject<ProductDirection | undefined>(undefined);

    private readonly directionMap: {[key: string]: ProductDirection} = {
        ['Нефть']: ProductDirection.Oil,
        ['Переработка']: ProductDirection.Refinery,
        ['Логистика']: ProductDirection.Logistic,
        ['Сбыт']: ProductDirection.Sales,
    }

    constructor(
        private readonly dataService: DataService,
        private readonly frameMessage: FrameMessageService,
        private readonly imgUrlPipe: ImageUrlPipe,
        private readonly dialog: DialogService,
        private readonly platform: PlatformService,
        private readonly destroy$: DestroyService,
    ) {}

    ngOnInit() {
        this.dataService.getInitialData("ru");

        this.platform.pageMapSize$
            .pipe(takeUntil(this.destroy$))
            .subscribe((size) => {
                if (size !== 'xs') {
                    this.mobileFilter$.next(undefined);
                    return;
                }
                this.mobileFilter$.next(ProductDirection.Oil);
            });

        combineLatest([this.dataService.products$, this.mobileFilter$]).pipe(
            filter(([products]) => products.length > 0),
            tap(x => console.log(x)),
            map(([products, filter]) => filter ? products.filter(p => !!p.filters.find(f => this.directionMap[f.name!] === filter)) : products),
            map((products) => products.map(p => ({
                group: p.filters
                    .filter(({filterType}) => filterType === 1)
                    .map(x => this.directionMap[x.name!])
                    .sort((a, b) => a - b),
                product: p
            })).filter(p => !!p.group.length)),
            takeUntil(this.destroy$)
        ).subscribe(preprocess => this.data$.next(this.data$.getValue().map(t => ({
            ...t, table: this.processGroup(preprocess.filter(p => p.product.productType === t.type)),
        }))));
    }

    scrollToProduct(product: ProductType) {
        const element = document.getElementById(`gantt-head-${product}`);
        element?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    connect() {
        this.dialog.open(ConnectFormComponent, 'hello from gantt').subscribe(x => console.log('close dialog', x));
    }

    selectFilter(filter: ProductDirection) {
        if (this.platform.pageMapSize$.getValue() !== 'xs') {
            return;
        }

        this.mobileFilter$.getValue() === filter
            ? this.mobileFilter$.next(undefined)
            : this.mobileFilter$.next(filter);
    }

    private processGroup = (preprocess: {product: IProductCard, group: ProductDirection[]}[]) => {
        const addToRaw = <T extends {product: IProductCard, group: ProductDirection[]}>(raw: T[], product: T): boolean => {
            const group = raw.flatMap(r => r.group);
            if (group.length === 4 || product.group.some(x => group.includes(x))) {
                return false;
            }
            raw.push(product);
            return true;
        }

        const createTable = (raws: {product: IProductCard, group: ProductDirection[]}[][]) => {
            const createRaw = (raw: {product: IProductCard, group: ProductDirection[]}[]) => {
                const fillRaw = (size: number, product: IProductCard) => ({ type: 'fill', size, product });
                const emptyRaw = (size: number) => ({ type: 'empty', size });

                const res: any[] = [];
                raw = raw.sort((a, b) => a.group[0] - b.group[0]);
                raw.forEach(r => {
                    const length = res.reduce((acc, cur) => acc + cur.size, 0);
                    if (r.group[0] - length > 1) {
                        res.push(emptyRaw(r.group[0] - 1 - length));
                    }
                    res.push(fillRaw(r.group.length, r.product));
                });
                return res;
            }
            return raws.map(r => createRaw(r));
        }

        const raws = [];
        while(preprocess.length) {
            const raw: any[] = [];
            const fillingIdx: number[] = [];

            preprocess.forEach((p, i) => {
                if (addToRaw(raw, p)) {
                    fillingIdx.push(i);
                }
            });
            preprocess = preprocess.filter((p,i ) => !fillingIdx.includes(i));
            raws.push(raw);
        }
        return createTable(raws);
    }
}
