import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutes} from '@core/enums';

const routes: Routes = [
    {
        path: `en/${AppRoutes.Catalog}`,
        loadChildren: () => import('./pages/catalog/catalog.module').then(x => x.CatalogModule),
        data: {language: "en"}
    },
    {
        path: AppRoutes.Catalog,
        loadChildren: () => import('./pages/catalog/catalog.module').then(x => x.CatalogModule),
        data: {language: "ru"}
    },

    {
        path: AppRoutes.Map,
        loadChildren: () => import('./pages/gantt-map/gantt-map.module').then(x => x.GanttMapModule),
    },
    {
        path: `en/${AppRoutes.Startups}`,
        loadChildren: () => import('./pages/startups/startups.module').then(x => x.StartupsModule),
        data: {language: "en"}
    },
    {
        path: AppRoutes.Startups,
        loadChildren: () => import('./pages/startups/startups.module').then(x => x.StartupsModule),
        data: {language: "ru"}
    },
    {
        path: `en/${AppRoutes.Partners}`,
        loadChildren: () => import('./pages/partners/partners.module').then(x => x.PartnersModule),
        data: {language: "en"}
    },
    {
        path: AppRoutes.Partners,
        loadChildren: () => import('./pages/partners/partners.module').then(x => x.PartnersModule),
        data: {language: "ru"}
    },
    {
        path: AppRoutes.Tasks,
        loadChildren: () => import('./pages/tasks/tasks.module').then(x => x.TasksModule),
    },
    {
        path: `en/${AppRoutes.News}`,
        loadChildren: () => import('./pages/news/news.module').then(x => x.NewsModule),
        data: {language: "en"}
    },
    {
        path: AppRoutes.News,
        loadChildren: () => import('./pages/news/news.module').then(x => x.NewsModule),
        data: {language: "ru"}
    },
    {
        path: `en/${AppRoutes.Contacts}`,
        loadChildren: () => import('./pages/contacts/contacts.module').then(x => x.ContactsModule),
        data: {language: "en"}
    },
    {
        path: AppRoutes.Contacts,
        loadChildren: () => import('./pages/contacts/contacts.module').then(x => x.ContactsModule),
        data: {language: "ru"}
    },
    {
        path: `${AppRoutes.Product}/:path`,
        loadChildren: () => import('./pages/product/product.module').then(x => x.ProductModule),
        data: {language: "ru"}
    },
    {
        path: `en/${AppRoutes.Product}/:path`,
        loadChildren: () => import('./pages/product/product.module').then(x => x.ProductModule),
        data: {language: "en"}
    },
    {
        path: `en/${AppRoutes.Policy}`,
        loadChildren: () => import('./pages/personal-policy/personal-policy.module').then(x => x.PersonalPolicyModule),
    },
    {
        path: AppRoutes.Policy,
        loadChildren: () => import('./pages/personal-policy/personal-policy.module').then(x => x.PersonalPolicyModule),
    },
    {
        path: `en`,
        loadChildren: () => import('./pages/catalog/catalog.module').then(x => x.CatalogModule),
        data: {language: "en"}
    },
    {
        path: `ru`,
        loadChildren: () => import('./pages/catalog/catalog.module').then(x => x.CatalogModule),
        data: {language: "ru"}
    },
    {
        path: ``,
        loadChildren: () => import('./pages/catalog/catalog.module').then(x => x.CatalogModule),
        data: {language: "ru"}
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
