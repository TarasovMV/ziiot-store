import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {ProductType} from '@core/enums';
import {inOutAnimation} from '@shared/animations/in-out.animation';
import {PlatformService} from "../../../../core/services/platform.service";

@Component({
    selector: 'app-catalog-header',
    templateUrl: './catalog-header.component.html',
    styleUrls: ['./catalog-header.component.scss'],
    animations: [inOutAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogHeaderComponent {
    @Output() connect = new EventEmitter<string>();
    readonly productType = ProductType;
    readonly isMobile$ = this.platformService.isMobile$;
    private pageWrapper: HTMLElement | null;
    private content?: Element;
    private contentY?: number;

    constructor(private readonly platformService: PlatformService) {
        this.pageWrapper = document.getElementById("page-wrapper");
        setTimeout(() => {
            this.content = document.getElementsByClassName("content")[0];
            const bodyRect = document.body.getBoundingClientRect();
            const contentRect = this.content.getBoundingClientRect();
            const offset   = contentRect.bottom - bodyRect.top;
            this.contentY = offset;
            console.log(offset);
        }, 350);
    }

    scrollToCatalog() {
        this.pageWrapper?.scrollTo({top: this.contentY, behavior: "smooth"});
    }
}
