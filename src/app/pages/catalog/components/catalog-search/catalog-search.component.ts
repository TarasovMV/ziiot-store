import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '@core/services/data.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs';
import {PlatformService} from '@core/services/platform.service';
import {FormControl} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
    selector: 'app-catalog-search',
    templateUrl: './catalog-search.component.html',
    styleUrls: ['./catalog-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogSearchComponent implements OnInit {
    @Output() filterToggle = new EventEmitter();
    isRussian = false;
    readonly search = new FormControl('');
    readonly isMobile$ = this.platformService.isMobile$;
    readonly filteredCount$ = this.dataService.filteredProducts$.pipe(map(x => x.length));
    readonly filtersCount$ = this.dataService.chosenFilters$.pipe(map(x => x.filter(f => f.filterType === 2 || f.filterType === 3).length));

    constructor(
        private readonly dataService: DataService,
        private readonly platformService: PlatformService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.isRussian = !this.router.url.startsWith("/en");
        this.search.valueChanges.pipe(debounceTime(200), distinctUntilChanged()).subscribe(
            x => this.dataService.search$.next(x)
        );
    }

    toggleFilter() {
        this.filterToggle.emit();
    }
}
