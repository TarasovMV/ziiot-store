import {Injectable} from "@angular/core";
import {Meta, Title} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    private frontEndHostName = "https://ziiotstore.ru"

    constructor(private meta: Meta, private title: Title) {}

    public setTitle(title: string) {
        this.title.setTitle(title);
        this.meta.updateTag({ property: 'og:title', content: title });
    }

    public setDescription(description: string) {
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:description', content: description });
    }

    public setKeywords(description: string) {
        this.meta.updateTag({ name: 'keywords', content: description });
    }

    public setFrontEndImage(url: string) {
    this.meta.updateTag({ property: 'og:image', content: `${this.frontEndHostName}/${url}`});
    }

    public setBackEndImage(url: string) {
        this.meta.updateTag({ property: 'og:image', content: `${environment.apiUrl}/${url}`});
    }
}
