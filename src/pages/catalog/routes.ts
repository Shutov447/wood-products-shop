import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CatalogComponent } from './catalog.component';
import { CATALOG_FEATURE, catalogEffects, catalogReducer } from './model';

export const routes: Routes = [
    {
        path: ':category',
        loadChildren: () => import('../products').then((m) => m.routes),
    },
    {
        path: '',
        component: CatalogComponent,
        providers: [
            provideState({
                name: CATALOG_FEATURE,
                reducer: catalogReducer,
            }),
            provideEffects([catalogEffects]),
        ],
        pathMatch: 'full',
    },
];
