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
    isRussian = false;
    isMenu = false;
    menu$ = new BehaviorSubject([
        // {
        //     route: AppRoutes.Map,
        //     title: 'Карта решений',
        //     active: false,
        // },
        {
            route: AppRoutes.Catalog,
            routeEn: `en/${AppRoutes.Catalog}`,
            title: 'Каталог решений',
            titleEn: 'Solution catalog',
            active: false,
        },
        {
            route: AppRoutes.Partners,
            routeEn: `en/${AppRoutes.Partners}`,
            title: 'Партнерам',
            titleEn: 'For partners',
            active: false,
        },
        {
            route: AppRoutes.Startups,
            routeEn: `en/${AppRoutes.Startups}`,
            title: 'Стартапам',
            titleEn: 'For startups',
            active: false,
        },
        // {
        //     route: AppRoutes.Tasks,
        //     title: 'Задачи для партнеров',
        //     active: false,
        // },
        {
            route: AppRoutes.News,
            routeEn: `en/${AppRoutes.News}`,
            title: 'Новости',
            titleEn: 'News',
            active: false,
        },
        {
            route: AppRoutes.Contacts,
            routeEn: `en/${AppRoutes.Contacts}`,
            title: 'Контакты',
            titleEn: 'Contacts',
            active: false,
        },
    ]);

    constructor(
        private readonly router: Router,
        private readonly cdRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {

        console.log(this.isRussian);
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event) => {
            const menu = this.menu$.getValue();

            if (!this.router.url.startsWith('/en')) {
                this.isRussian = true;
            }

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

    async switchRussian() {
        if (this.router.url.startsWith("/en")) {
            console.log(this.router.url);
            const newRoute = this.router.url.replace("/en", "");
            await this.router.navigate([newRoute]);
            this.isRussian = true;
        }
    }

    async switchEnglish() {
        if (this.isRussian) {
            console.log(this.router.url);
            const newRoute = "/en" +  this.router.url;
            await this.router.navigate([newRoute]);
            this.isRussian = false;
        }
    }
}
