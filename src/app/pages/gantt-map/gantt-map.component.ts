import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ProductType} from '../../core/enums';
import {DataService} from '../../core/services/data.service';
import {ProductDirection} from '../../core/enums';
import {IProductCard} from '../../core/interfaces/product-card.interface';
import {BehaviorSubject, filter, map} from 'rxjs';
import {FrameMessageService} from '../../core/services/frame-message.service';
import {ImageUrlPipe} from '../../shared/pipes/image-url.pipe';


@Component({
    selector: 'app-gantt-map',
    templateUrl: './gantt-map.component.html',
    styleUrls: ['./gantt-map.component.scss'],
    providers: [ImageUrlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttMapComponent implements OnInit {
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
    ) {}

    ngOnInit() {
        this.dataService.products$.pipe(
            filter(x => x.length > 0),
            map(x => x.map(p => ({
                group: p.filters
                    .filter(({filterType}) => filterType === 1)
                    .map(x => this.directionMap[x.name!])
                    .sort((a, b) => a - b),
                product: p
            })).filter(p => !!p.group.length))
        ).subscribe(preprocess => this.data$.next(this.data$.getValue().map(t => ({
            ...t, table: this.processGroup(preprocess.filter(p => p.product.productType === t.type)),
        }))));

        this.dataService.getInitialData();
    }

    scrollToProduct(product: ProductType) {
        const element = document.getElementById(`gantt-head-${product}`);
        element?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    productClick(product: IProductCard | undefined) {
        if (!product) {
            return;
        }
        if (!product.document) {
            this.frameMessage.sendCardUrl(product.url);
        } else {
            this.frameMessage.sendCardUrl(this.imgUrlPipe.transform(product.document));
        }
    }

    connect() {
        const payload = {
            type: 'form-connect',
            body: {}
        }
        this.frameMessage.sendMessage(JSON.stringify(payload));
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
                    if (r.group[0] - res.length > 0) {
                        res.push(emptyRaw(r.group[0] - res.length));
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
