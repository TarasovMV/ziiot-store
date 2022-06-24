import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IFilter} from '@core/interfaces/filter.interface';
import {DataService} from '@core/services/data.service';
import {map} from 'rxjs';
import {PlatformService} from '@core/services/platform.service';
import {Router} from "@angular/router";


type CategoryCardType = 'default' | 'all';

@Component({
    selector: 'app-catalog-category',
    templateUrl: './catalog-category.component.html',
    styleUrls: ['./catalog-category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogCategoryComponent {
    isRussian = false;
    @Input() type: CategoryCardType = 'default';
    @Input() data!: IFilter;
    @Input() isActive: boolean = false;
    readonly allCount$ = this.dataService.products$.pipe(map(x => x.length));
    readonly isMobile$ = this.platformService.isMobile$;
    readonly imageMap: {[key: string]: string} = {
        ['Нефть']: 'assets/images/neft.png',
        ['Oil']: 'assets/images/neft.png',
        ['Petroleum']: 'assets/images/neft.png',
        ['Переработка']: 'assets/images/pererabotka.png',
        ['Refining']: 'assets/images/pererabotka.png',
        ['Логистика']: 'assets/images/logistika.png',
        ['Logistics']: 'assets/images/logistika.png',
        ['Сбыт']: 'assets/images/sbyt.png',
        ['Sales']: 'assets/images/sbyt.png',
    }

    constructor(
        private readonly dataService: DataService,
        private readonly platformService: PlatformService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.isRussian = !this.router.url.startsWith("/en");
    }
}
