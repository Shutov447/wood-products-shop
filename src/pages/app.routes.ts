import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { Page404Component } from './page-404';

export const routes: Routes = [
    {
        path: 'delivery',
        loadChildren: () => import('./delivery').then((m) => m.routes),
    },
    {
        path: 'articles',
        loadChildren: () => import('./articles').then((m) => m.routes),
    },
    {
        path: 'about-us',
        loadChildren: () => import('./about-us').then((m) => m.routes),
    },
    {
        path: 'contacts',
        loadChildren: () => import('./contacts').then((m) => m.routes),
    },
    {
        path: 'catalog',
        loadChildren: () => import('./catalog').then((m) => m.routes),
    },
    {
        path: 'not-found',
        component: Page404Component,
    },
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'not-found',
    },
];
