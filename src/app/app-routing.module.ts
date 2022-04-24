import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/main/main.module').then(x => x.MainModule),
    },
    {
        path: 'product/:path',
        loadChildren: () => import('./pages/product/product.module').then(x => x.ProductModule),
    },
    {
        path: 'fullscreen-gallery',
        loadChildren: () => import('./pages/fullscreen-gallery/fullscreen-gallery.module').then(x => x.FullscreenGalleryModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
