import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SeoService} from "../../core/services/seo.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent implements OnInit {
    isRussian = false;

    constructor(private seoService: SeoService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.isRussian = data['language'] === "ru";
            if (data['language'] === "ru") {
                this.seoService.setTitle("Новости");
                this.seoService.setDescription("Первая торговая площадка для цифровизации нефтехимической и нефтеперерабатывающей промышленности");
                this.seoService.setKeywords("Цифровой маркетплейс, цифровизация, IoT решения, нефтепереработка, нефтехимия, управление предприятием, управление производством, нефть, надежность, переработка, производство, цифровой двойник, управление ремонтами, управление надежностью");
                this.seoService.setBackEndImage("og/catalog.png");
            }
            else {
                this.seoService.setTitle("News");
                this.seoService.setDescription("The first marketplace for the digitalization of the petrochemical and oil refining industries");
                this.seoService.setKeywords("Digital marketplace, digitalization, IoT solutions, oil refining, petrochemicals, enterprise management, production management, oil, reliability, refining, production, digital twin, repair management, reliability management");
                this.seoService.setBackEndImage("og/catalog.png");
            }
        });
    }
}
