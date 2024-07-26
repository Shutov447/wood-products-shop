import { Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { productGuard } from './lib';

export const routes: Routes = [
    {
        path: '',
        component: ProductComponent,
        pathMatch: 'full',
        canActivate: [productGuard],
    },
];
