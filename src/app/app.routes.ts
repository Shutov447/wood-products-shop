import { Routes } from '@angular/router';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: 'delivery',
        component: DeliveryComponent,
    },
    {
        path: '',
        component: HomeComponent,
    },
    // {
    //     path: '**',
    //     component:404PageComponent,
    // }
];
