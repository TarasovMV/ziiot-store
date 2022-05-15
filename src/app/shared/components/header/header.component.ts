import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {inOutAnimation} from '../../animations/in-out.animation';
import {BehaviorSubject, delay, filter, from} from 'rxjs';
import {AppRoutes} from '@core/enums';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [inOutAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
    isMenu = false;
    menu$ = new BehaviorSubject([
        // {
        //     route: AppRoutes.Map,
        //     title: 'Карта решений',
        //     active: false,
        // },
        {
            route: AppRoutes.Catalog,
            title: 'Каталог решений',
            active: false,
        },
        {
            route: AppRoutes.Partners,
            title: 'Партнерам',
            active: false,
        },
        {
            route: AppRoutes.Startups,
            title: 'Стартапам',
            active: false,
        },
        // {
        //     route: AppRoutes.Tasks,
        //     title: 'Задачи для партнеров',
        //     active: false,
        // },
        {
            route: AppRoutes.News,
            title: 'Новости',
            active: false,
        },
        {
            route: AppRoutes.Contacts,
            title: 'Контакты',
            active: false,
        },
    ]);

    constructor(
        private readonly router: Router,
        private readonly cdRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event) => {
            const menu = this.menu$.getValue();

            menu.forEach(x => x.active = false);
            const url = (event as NavigationEnd).urlAfterRedirects.split('/').slice(-1)[0];
            const compareItem = menu.find(x => x.route === url);

            if (!!compareItem) {
                compareItem.active = true;
            }

            this.menu$.next([...menu]);
        })
    }

    mobileLink(url: string) {
        from(this.router.navigate([url])).pipe(delay(300)).subscribe(() => {
            this.isMenu = false;
            this.cdRef.markForCheck();
        });
    }
}
