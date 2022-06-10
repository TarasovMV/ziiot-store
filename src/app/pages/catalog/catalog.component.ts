import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PlatformService} from '@core/services/platform.service';
import {DataService} from '@core/services/data.service';
import {ImageUrlPipe} from '@shared/pipes/image-url.pipe';
import {ConnectFormComponent} from '@shared/dialogs/connect-form/connect-form.component';
import {DialogService} from '@core/services/dialog.service';
import {SeoService} from "../../core/services/seo.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
    providers: [ImageUrlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
    isMobileFilter = false;
    isRussian = false;
    readonly products$ = this.dataService.filteredProducts$;
    readonly categories$ = this.dataService.categories$;
    readonly isMobile$ = this.platformService.isMobile$;

    constructor(
        private readonly dataService: DataService,
        private readonly platformService: PlatformService,
        private readonly dialog: DialogService,
        private readonly seoService: SeoService,
        private readonly activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(data => {
            console.log(data['language']);
            this.isRussian = data['language'] === "ru";
            this.dataService.getInitialData(data['language']);

            if (data['language'] === "ru") {
                this.seoService.setTitle("Цифровой индустриальный маркетплейс");
                this.seoService.setDescription("Первая торговая площадка для цифровизации нефтехимической и нефтеперерабатывающей промышленности");
                this.seoService.setKeywords("Цифровой маркетплейс, цифровизация, IoT решения, нефтепереработка, нефтехимия, управление предприятием, управление производством, нефть, надежность, переработка, производство, цифровой двойник, управление ремонтами, управление надежностью");
                this.seoService.setBackEndImage("og/catalog.png");
            }
            else {
                this.seoService.setTitle("Digital industrial marketplace");
                this.seoService.setDescription("The first marketplace for the digitalization of the petrochemical and oil refining industries");
                this.seoService.setKeywords("Digital marketplace, digitalization, IoT solutions, oil refining, petrochemicals, enterprise management, production management, oil, reliability, refining, production, digital twin, repair management, reliability management");
                this.seoService.setBackEndImage("og/catalog.png");
            }
        });
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
