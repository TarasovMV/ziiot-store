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
        this.seoService.setDescription("Мы развиваем цифровые инновации, коммерциализируем цифровые продукты, выстраиваем долгосрочные партнерства");
        this.seoService.setKeywords("Стартапы, гранты, стартапы нефтегазовой отрасли, цифровизация нефтегазовой отрасли, цифровые технологии в нефтегазовой отрасли, актуальные проблемы нефтегазовой отрасли, предприятия нефтегазовой отрасли, развитие нефтегазовой отрасли в России");
        this.seoService.setBackEndImage("og/catalog.png");
    }

}
