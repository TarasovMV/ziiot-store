import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IFilter} from '../../../core/interfaces/filter.interface';
import {DataService} from '../../../core/services/data.service';
import {map} from 'rxjs';
import {PlatformService} from '../../../core/services/platform.service';


type CategoryCardType = 'default' | 'all';

@Component({
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent implements OnInit {
    @Input() type: CategoryCardType = 'default';
    @Input() data!: IFilter;
    @Input() isActive: boolean = false;
    readonly allCount$ = this.dataService.products$.pipe(map(x => x.length));
    readonly isMobile$ = this.platformService.isMobile$;
    readonly imageMap: {[key: string]: string} = {
        ['Нефть']: 'assets/images/neft.png',
        ['Переработка']: 'assets/images/pererabotka.png',
        ['Логистика']: 'assets/images/logistika.png',
        ['Сбыт']: 'assets/images/sbyt.png',
    }

    constructor(
        private readonly dataService: DataService,
        private readonly platformService: PlatformService,
    ) {
    }

    ngOnInit(): void {
    }

}
