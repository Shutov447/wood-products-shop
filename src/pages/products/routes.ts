/* eslint-disable boundaries/element-types */
import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import {
    PRODUCTS_FILTER_FEATURE,
    productsFilterEffects,
    productsFilterReducer,
} from '@widgets/products-filter';
import { provideEffects } from '@ngrx/effects';
import { categoryGuard } from '../catalog';
import { ProductsComponent } from './products.component';

export const routes: Routes = [
    {
        path: ':product',
        loadChildren: () => import('../product').then((m) => m.routes),
    },
    {
        path: '',
        component: ProductsComponent,
        providers: [
            provideState({
                name: PRODUCTS_FILTER_FEATURE,
                reducer: productsFilterReducer,
            }),
            provideEffects([productsFilterEffects]),
        ],
        pathMatch: 'full',
        canActivate: [categoryGuard],
    },
];
