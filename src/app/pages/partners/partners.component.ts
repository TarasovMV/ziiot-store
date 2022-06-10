import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SeoService} from "../../core/services/seo.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnersComponent implements OnInit {
    isRussian = false;

    constructor(private seoService: SeoService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.isRussian = data['language'] === "ru";
            if (data['language'] === "ru") {
                this.seoService.setTitle("Партнерам");
                this.seoService.setDescription("Создавай отраслевые продукты на платформе Zyfra, интегрируй свои или участвуй в решении наших задач");
                this.seoService.setKeywords("Отрасль, Zyfra, стартапы, отраслевые разработчики, нефтехимия, нефть, научно-технические институты, НИОКР, АСУ ТП, отраслевые решения, гранты, стартапы нефтегазовой отрасли, цифровизация нефтегазовой отрасли, цифровые технологии в нефтегазовой отрасли, актуальные проблемы нефтегазовой отрасли, предприятия нефтегазовой отрасли, развитие нефтегазовой отрасли в России");
                this.seoService.setBackEndImage("og/catalog.png");
            }
            else {
                this.seoService.setTitle("For partners");
                this.seoService.setDescription("Create industry products on the Zyfra platform, integrate your own or participate in solving our problems");
                this.seoService.setKeywords("Industry, Zyfra, startups, industry developers, petrochemicals, oil, science and technology institutes, R&D, process control systems, industry solutions, grants, oil and gas industry startups, oil and gas industry digitalization, digital technologies in the oil and gas industry, actual problems of the oil and gas industry, oil and gas enterprises , development of the oil and gas industry in Russia");
                this.seoService.setBackEndImage("og/catalog.png");
            }
        });

    }

}
