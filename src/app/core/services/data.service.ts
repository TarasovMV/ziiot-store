import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, filter, map, mergeMap, Observable, tap} from 'rxjs';
import {IProductCard} from '../interfaces/product-card.interface';
import {ApiService} from './api.service';
import {IFilter} from '../interfaces/filter.interface';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    readonly products$ = new BehaviorSubject<IProductCard[]>([]);
    readonly filters$ = new BehaviorSubject<IFilter[]>([]);

    readonly categories$ = this.filters$.pipe(map(f => f.filter(x => x.filterType === 1)));
    readonly leftFilters$ = this.filters$.pipe(map(f => f.filter(x => x.filterType === 2)));
    readonly restFilters$ = this.filters$.pipe(map(f => f.filter(x => x.filterType === 3)));

    readonly search$ = new BehaviorSubject<string>('');
    readonly chosenFilters$ = new BehaviorSubject<IFilter[]>([]);

    readonly filteredProducts$ = combineLatest([
        this.chosenFilters$, this.products$, this.search$
    ]).pipe(
        map(([filters, products, search]) => {
            let filtered = [...products];
            [1, 2, 3].forEach(filterType => {
                const filter = filters.filter(x => x.filterType === filterType);
                if (!!filter.length) {
                    filter.forEach(f => {
                        filtered = filtered.filter(p => p.filters.find(x => x.filterId === f.id && x.filterType === filterType));
                    })
                }
            });
            if (search?.length) {
                filtered = filtered.filter(x => x.name.toLowerCase().search(search.toLowerCase()) !== -1);
            }
            return filtered;
        }),
    );

    constructor(private readonly apiService: ApiService) {
    }

    getInitialData() {
        this.apiService.getFilters()
            .pipe(
                tap(filters => this.filters$.next(filters)),
                mergeMap(filters => this.apiService.getProducts().pipe(
                    map(products => {
                        products.forEach(p => p.filters.forEach(x => x.name = filters.find(f => f.id === x.filterId && f.filterType === x.filterType)?.name));
                        products.forEach(p => p.filters = p.filters.filter(x => !!x.name));
                        return products;
                    }),
                    tap(products => this.products$.next(products)),
                ))
            )
            .subscribe();
    }

    categoryFilter(id: number | undefined) {
        const FILTER_TYPE = 1;

        let current = this.chosenFilters$.getValue();

        if (!id || !!this.chosenFilters$.getValue().find(x => x.id === id && x.filterType === FILTER_TYPE)) {
            this.chosenFilters$.next(current.filter(x => x.filterType !== FILTER_TYPE));
            return;
        }
        const filter = this.filters$.getValue().find(x => x.id === id && x.filterType === FILTER_TYPE);
        this.chosenFilters$.next([filter!, ...current.filter(x => x.filterType !== FILTER_TYPE)]);
    }

    leftFilter(id: number, value: boolean) {
        const FILTER_TYPE = 2;

        let current = this.chosenFilters$.getValue();

        if (!value) {
            current = current.filter(x => x.id !== id || x.filterType !== FILTER_TYPE);
            this.chosenFilters$.next(current);
            return;
        }
        const filter = this.filters$.getValue().find(x => x.id === id && x.filterType === FILTER_TYPE);
        if (this.chosenFilters$.getValue().find(f => filter!.filterType === f.filterType && filter!.id === f.id)) {
            return;
        }
        this.chosenFilters$.next([filter!, ...current]);
    }

    restFilter(id: number, value: boolean) {
        const FILTER_TYPE = 3;

        let current = this.chosenFilters$.getValue();

        if (!value) {
            current = current.filter(x => x.id !== id || x.filterType !== FILTER_TYPE);
            this.chosenFilters$.next(current);
            return;
        }
        const filter = this.filters$.getValue().find(x => x.id === id && x.filterType === FILTER_TYPE);
        if (this.chosenFilters$.getValue().find(f => filter!.filterType === f.filterType && filter!.id === f.id)) {
            return;
        }
        this.chosenFilters$.next([filter!, ...current]);
    }

    resetRestFilters() {
        const FILTER_TYPE = 2;

        let current = this.chosenFilters$.getValue();
        current = current.filter(x => x.filterType !== FILTER_TYPE);
        this.chosenFilters$.next(current);
    }

    resetLeftFilters() {
        const FILTER_TYPE = 3;

        let current = this.chosenFilters$.getValue();
        current = current.filter(x => x.filterType !== FILTER_TYPE);
        this.chosenFilters$.next(current);
    }
}
