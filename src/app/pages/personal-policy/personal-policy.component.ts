import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-personal-policy',
    templateUrl: './personal-policy.component.html',
    styleUrls: ['./personal-policy.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalPolicyComponent {
    isRussian = false;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.isRussian = !this.router.url.startsWith("/en");
    }
}
