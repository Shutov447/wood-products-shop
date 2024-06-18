import { Routes } from '@angular/router';
import { DeliveryComponent } from './delivery';
import { HomeComponent } from './home';
import { Page404Component } from './page-404';
import { AboutUsComponent } from './about-us';
import { CatalogComponent, categoryGuard } from './catalog';
import { ArticlesComponent } from './articles';
import { ContactsComponent } from './contacts';
import { ProductsComponent } from './products';
import { ProductComponent } from './product/product.component';
import { productGuard } from './product';

export const routes: Routes = [
    {
        path: 'delivery',
        component: DeliveryComponent,
    },
    {
        path: 'articles',
        component: ArticlesComponent,
    },
    {
        path: 'about-us',
        component: AboutUsComponent,
    },
    {
        path: 'contacts',
        component: ContactsComponent,
    },
    {
        path: 'catalog',
        component: CatalogComponent,
    },
    {
        path: 'catalog/:category',
        component: ProductsComponent,
        canActivate: [categoryGuard],
    },
    {
        path: 'product/:product',
        component: ProductComponent,
        canActivate: [productGuard],
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
