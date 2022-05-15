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
        this.seoService.setDescription("Создавай отраслевые продукты на платформе Zyfra, интегрируй свои или участвуй в решении наших задач");
        this.seoService.setKeywords("Отрасль, Zyfra, стартапы, отраслевые разработчики, нефтехимия, нефть, научно-технические институты, НИОКР, АСУ ТП, отраслевые решения, гранты, стартапы нефтегазовой отрасли, цифровизация нефтегазовой отрасли, цифровые технологии в нефтегазовой отрасли, актуальные проблемы нефтегазовой отрасли, предприятия нефтегазовой отрасли, развитие нефтегазовой отрасли в России");
        this.seoService.setBackEndImage("og/catalog.png");
    }

}
