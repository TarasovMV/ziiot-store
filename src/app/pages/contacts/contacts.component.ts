import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SeoService} from "../../core/services/seo.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
    isRussian = false;

    constructor(private seoService: SeoService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.isRussian = data['language'] === "ru";
            if (data['language'] === "ru") {
                this.seoService.setTitle("Контакты");
                this.seoService.setDescription("Первая торговая площадка для цифровизации нефтехимической и нефтеперерабатывающей промышленности");
                this.seoService.setKeywords("Цифровой маркетплейс, цифровизация, IoT решения, нефтепереработка, нефтехимия, управление предприятием, управление производством, нефть, надежность, переработка, производство, цифровой двойник, управление ремонтами, управление надежностью");
                this.seoService.setBackEndImage("og/catalog.png");
            }
            else {
                this.seoService.setTitle("Contacts");
                this.seoService.setDescription("The first marketplace for the digital petrochemical and refining industry");
                this.seoService.setKeywords("Digital marketplace, digitalization, IoT solutions, oil refining, petrochemicals, enterprise management, production management, oil, reliability, refining, production, digital twin, repair management, reliability management");
                this.seoService.setBackEndImage("og/catalog.png");
            }
            this.seoService.setUrl("https://ziiotstore.ru/contacts");
        });
    }
}
