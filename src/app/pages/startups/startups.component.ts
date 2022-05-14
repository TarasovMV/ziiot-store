import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SeoService} from "../../core/services/seo.service";

@Component({
    selector: 'app-startups',
    templateUrl: './startups.component.html',
    styleUrls: ['./startups.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupsComponent implements OnInit {

    constructor(private seoService: SeoService) {
    }

    ngOnInit(): void {
        this.seoService.setTitle("Стартапам");
        this.seoService.setDescription("Первая торговая площадка для цифровизации нефтехимической и нефтеперерабатывающей промышленности");
        this.seoService.setKeywords("Цифровой маркетплейс, цифровизация, IoT решения, нефтепереработка, нефтехимия, управление предприятием, управление производством, нефть, надежность, переработка, производство, цифровой двойник, управление ремонтами, управление надежностью");
        this.seoService.setFrontEndImage("assets/images/og/catalog.png");
    }

}
