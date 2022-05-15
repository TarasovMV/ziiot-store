import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutes} from './core/enums';

const routes: Routes = [
    {
        path: AppRoutes.Catalog,
        loadChildren: () => import('./pages/catalog/catalog.module').then(x => x.CatalogModule),
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
        path: AppRoutes.Contacts,
        loadChildren: () => import('./pages/contacts/contacts.module').then(x => x.ContactsModule),
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
        path: '**',
        redirectTo: AppRoutes.Catalog
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabledBlocking'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
