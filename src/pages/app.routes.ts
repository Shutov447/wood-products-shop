import { Routes } from '@angular/router';
import { DeliveryComponent } from './delivery/delivery.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page-404/index';
import { AboutUsComponent } from './about-us/about-us.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ArticlesComponent } from './articles/articles.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProductsComponent } from './products/products.component';
import { categoryGuard } from './catalog/lib/category-guard/category.guard';
import { ProductComponent } from './product/product.component';
import { productGuard } from './product/lib/product-guard/product.guard';

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
