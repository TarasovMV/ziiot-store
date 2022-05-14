import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SeoService} from "../../core/services/seo.service";

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnersComponent implements OnInit {

    constructor(private seoService: SeoService) {
    }

    ngOnInit(): void {
        this.seoService.setTitle("Партнерам");
        this.seoService.setDescription("Первая торговая площадка для цифровизации нефтехимической и нефтеперерабатывающей промышленности");
        this.seoService.setKeywords("Цифровой маркетплейс, цифровизация, IoT решения, нефтепереработка, нефтехимия, управление предприятием, управление производством, нефть, надежность, переработка, производство, цифровой двойник, управление ремонтами, управление надежностью");
        this.seoService.setFrontEndImage("assets/images/og/catalog.png");
    }

}
