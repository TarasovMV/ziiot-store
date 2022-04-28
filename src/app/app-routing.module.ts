import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutes} from './core/enums';

const routes: Routes = [
    {
        path: AppRoutes.Catalog,
        loadChildren: () => import('./pages/main/main.module').then(x => x.MainModule),
    },
    {
        path: `${AppRoutes.Product}/:path`,
        loadChildren: () => import('./pages/product/product.module').then(x => x.ProductModule),
    },
    {
        path: 'fullscreen-gallery',
        loadChildren: () => import('./pages/fullscreen-gallery/fullscreen-gallery.module').then(x => x.FullscreenGalleryModule),
    },
    {
        path: AppRoutes.Map,
        loadChildren: () => import('./pages/gantt-map/gantt-map.module').then(x => x.GanttMapModule),
    },
    {
        path: '**',
        redirectTo: AppRoutes.Map
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
