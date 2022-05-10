import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PlatformService} from '../../core/services/platform.service';
import {DataService} from '../../core/services/data.service';
import {ImageUrlPipe} from '../../shared/pipes/image-url.pipe';
import {ConnectFormComponent} from '../../shared/dialogs/connect-form/connect-form.component';
import {DialogService} from '../../core/services/dialog.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
    providers: [ImageUrlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
    isMobileFilter = false;
    readonly products$ = this.dataService.filteredProducts$;
    readonly categories$ = this.dataService.categories$;
    readonly isMobile$ = this.platformService.isMobile$;

    constructor(
        private readonly dataService: DataService,
        private readonly platformService: PlatformService,
        private readonly dialog: DialogService,
    ) {
    }

    ngOnInit() {
        this.dataService.getInitialData();
    }

    openForm(type: string) {
        const handleType = type === 'set' ? '3' : '1';
        this.dialog.open(ConnectFormComponent, {type: handleType}).subscribe(x => console.log('close dialog', x));
    }

    categoryClick(id: number | undefined) {
        this.dataService.categoryFilter(id);
    }

    isActiveCategory(id: number | undefined): boolean {
        const FILTER_TYPE = 1;

        const filters = this.dataService.chosenFilters$.getValue();

        if (!id) {
            return !filters.find(x => x.filterType === FILTER_TYPE);
        }
        return !!filters.find(x => x.filterType === FILTER_TYPE && x.id === id);
    }

    toggleFilter() {
        this.isMobileFilter = !this.isMobileFilter;
    }
}
