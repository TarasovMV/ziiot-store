import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataService} from '@core/services/data.service';
import {map, take} from 'rxjs';
import {IFilter} from '@core/interfaces/filter.interface';
import {ViewDetectorService} from '@core/services/view-detector.service';
import {Router} from "@angular/router";


@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
    isRussian = false;
    isAsutpOpen = false;
    isRestOpen = false;

    readonly ungroupedFilters$ = this.dataService.leftFilters$.pipe(
        map(filters => filters.filter(f => f.name !== 'АСУ ТП' && !f.parentId)),
    );
    readonly groupedFilters$ = this.dataService.leftFilters$.pipe(
        map(filters => filters.filter(f => f.name !== 'АСУ ТП' && !!f.parentId)),
    );
    readonly restFilters$ = this.dataService.restFilters$;

    constructor(
        public readonly dataService: DataService,
        private readonly viewDetector: ViewDetectorService,
        private readonly cdRef: ChangeDetectorRef,
        private router: Router
    ) {}

    ngOnInit() {
        this.isRussian = !this.router.url.startsWith("/en");
    }

    ngDoCheck() {
        this.viewDetector.setView();
    }

    checkGroup(event: any) {
        const checked = event.checked;
        this.groupedFilters$.pipe(take(1)).subscribe(filters => {
            filters.forEach(f => this.checkLeft(f.id, checked));
            this.cdRef.markForCheck();
        });
    }

    checkItem(id: number, type: number, event: any) {
        const checked = event.checked;
        if (type === 2) {
            this.checkLeft(id, checked);
        } else {
            this.checkRest(id, checked);
        }
    }

    getCheckedItem(id: number, type: number): boolean {
        const chosen = this.dataService.chosenFilters$.getValue();
        return !!chosen.find(x => x.filterType === type && x.id === id);
    }

    getCheckedGroup(): boolean {
        const chosen = this.dataService.chosenFilters$.getValue();
        const all = this.dataService.filters$.getValue();
        const filterGroup = (arr: IFilter[]) => arr.filter(x => x.filterType === 2 && !!x.parentId);
        return filterGroup(chosen).length === filterGroup(all).length;
    }

    toggleAsutp() {
        this.isAsutpOpen = !this.isAsutpOpen;
    }

    toggleRest() {
        this.isRestOpen = !this.isRestOpen;
    }

    reset() {
        this.dataService.resetLeftFilters();
        this.dataService.resetRestFilters();
    }

    private checkLeft(id: number, value: boolean) {
        this.dataService.leftFilter(id, value);
    }

    private checkRest(id: number, value: boolean) {
        this.dataService.restFilter(id, value);
    }
}
