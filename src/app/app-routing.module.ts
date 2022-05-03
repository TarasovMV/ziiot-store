import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutes} from './core/enums';

const routes: Routes = [
    {
        path: AppRoutes.Catalog,
        loadChildren: () => import('./pages/main/main.module').then(x => x.MainModule),
    },
    {
        path: AppRoutes.Map,
        loadChildren: () => import('./pages/gantt-map/gantt-map.module').then(x => x.GanttMapModule),
    },
    {
        path: AppRoutes.Startups,
        loadChildren: () => import('./pages/startups/startups.module').then(x => x.StartupsModule),
    },
    {
        path: AppRoutes.Partners,
        loadChildren: () => import('./pages/partners/partners.module').then(x => x.PartnersModule),
    },
    {
        path: AppRoutes.Tasks,
        loadChildren: () => import('./pages/tasks/tasks.module').then(x => x.TasksModule),
    },
    {
        path: AppRoutes.News,
        loadChildren: () => import('./pages/news/news.module').then(x => x.NewsModule),
    },
    {
        path: `${AppRoutes.Product}/:path`,
        loadChildren: () => import('./pages/product/product.module').then(x => x.ProductModule),
    },
    {
        path: AppRoutes.Policy,
        loadChildren: () => import('./pages/personal-policy/personal-policy.module').then(x => x.PersonalPolicyModule),
    },
    {
        path: 'fullscreen-gallery',
        loadChildren: () => import('./pages/fullscreen-gallery/fullscreen-gallery.module').then(x => x.FullscreenGalleryModule),
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
