import { Routes } from '@angular/router';
import { AboutUsComponent } from './about-us.component';

export const routes: Routes = [
    {
        path: '',
        component: AboutUsComponent,
        pathMatch: 'full',
    },
];
