import {ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

    @ViewChild("arrowWrapper") arrowWrapper : ElementRef | undefined;
    private pageWrapper: HTMLElement | null;
    constructor() {
        this.pageWrapper = document.getElementById("page-wrapper");
        this.pageWrapper?.addEventListener("scroll", () => {
            if (!this.arrowWrapper) return;
            // @ts-ignore
            if (this.pageWrapper?.scrollTop > 100) {
                this.arrowWrapper.nativeElement.style.display = "block";
            } else {
                this.arrowWrapper.nativeElement.style.display = "none";
            }
        });
    }

    scrollTop() {
        this.pageWrapper?.scrollTo({top: 0, behavior: "smooth"});
    }
}
