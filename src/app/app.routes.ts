import { Routes } from '@angular/router';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page-404/page-404.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ProductsComponent } from './pages/products/products.component';
import { categoryGuard } from './pages/catalog/shared/category-guard/category.guard';
import { ProductComponent } from './pages/product/product.component';
import { productGuard } from './pages/product/shared/product-guard/product.guard';

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
