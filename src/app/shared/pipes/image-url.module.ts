import {NgModule} from '@angular/core';
import {ImageUrlPipe} from './image-url.pipe';

@NgModule({
    declarations: [ImageUrlPipe],
    exports: [ImageUrlPipe],
})
export class ImageUrlPipeModule {
}
