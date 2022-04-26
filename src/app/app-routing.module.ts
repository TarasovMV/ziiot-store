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
    {
        path: 'gantt-map',
        loadChildren: () => import('./pages/gantt-map/gantt-map.module').then(x => x.GanttMapModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
