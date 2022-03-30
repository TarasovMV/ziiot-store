import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ViewDetectorService} from '../../core/services/view-detector.service';
import {FrameMessageService} from '../../core/services/frame-message.service';
import {IProductCard} from '../../core/interfaces/product-card.interface';
import {PlatformService} from '../../core/services/platform.service';
import {DataService} from '../../core/services/data.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
    isMobileFilter = false;
    readonly products$ = this.dataService.filteredProducts$;
    readonly categories$ = this.dataService.categories$;
    readonly isMobile$ = this.platformService.isMobile$;

    constructor(
        private readonly dataService: DataService,
        private readonly viewDetector: ViewDetectorService,
        private readonly frameMessage: FrameMessageService,
        private readonly platformService: PlatformService,
    ) {
    }

    ngOnInit(): void {
        console.log('start angular');

        this.dataService.getInitialData();
    }

    ngDoCheck() {
        this.viewDetector.setView();
    }

    productClick(product: IProductCard) {
        this.frameMessage.sendCardUrl(product.url);
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
