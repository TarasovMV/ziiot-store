import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SeoService} from "../../core/services/seo.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-startups',
    templateUrl: './startups.component.html',
    styleUrls: ['./startups.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupsComponent implements OnInit {
    isRussian = false;

    constructor(private seoService: SeoService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.isRussian = data['language'] === "ru";
            if (data['language'] === "ru") {
                this.seoService.setTitle("Стартапам");
                this.seoService.setDescription("Мы развиваем цифровые инновации, коммерциализируем цифровые продукты, выстраиваем долгосрочные партнерства");
                this.seoService.setKeywords("Стартапы, гранты, стартапы нефтегазовой отрасли, цифровизация нефтегазовой отрасли, цифровые технологии в нефтегазовой отрасли, актуальные проблемы нефтегазовой отрасли, предприятия нефтегазовой отрасли, развитие нефтегазовой отрасли в России");
                this.seoService.setBackEndImage("og/catalog.png");
            }
            else {
                this.seoService.setTitle("To startups");
                this.seoService.setDescription("We develop digital innovations, commercialize digital products, build long-term partnerships");
                this.seoService.setKeywords("Startups, grants, startups in the oil and gas industry, digitalization of the oil and gas industry, digital technologies in the oil and gas industry, current problems in the oil and gas industry, oil and gas industry enterprises, development of the oil and gas industry in Russia");
                this.seoService.setBackEndImage("og/catalog.png");
            }
        });
        this.seoService.setUrl("https://ziiotstore.ru/startups");

    }

}
