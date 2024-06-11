import { provideAnimations } from '@angular/platform-browser/animations';
import { TUI_SANITIZER, TuiRootModule } from '@taiga-ui/core';
import {
    ApplicationConfig,
    importProvidersFrom,
    isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
    HttpClientModule,
    provideHttpClient,
    withFetch,
} from '@angular/common/http';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { ARTICLES_CARDS_FEATURE } from './store/articles/articles.state';
import { articlesReducer } from './store/articles/articles.reducer';
import * as articlesCardsEffects from './store/articles/articles.effects';
import * as slidersEffects from './store/sliders/sliders.effects';
import * as homeEffects from './pages/home/store/home.effects';
import * as servicesEffects from './store/services/services.effects';
import * as productsEffects from './store/products/products.effects';
import * as catalogEffects from './pages/catalog/store/catalog.effects';
import * as productsFilterEffects from './components/products-filter/store/products-filter.effects';
import { SLIDERS_FEATURE } from './store/sliders/sliders.state';
import { slidresReducer } from './store/sliders/sliders.reducer';
import { SERVICES_FEATURE } from './store/services/services.state';
import { servicesReducer } from './store/services/services.reducer';
import { PRODUCTS_FEATURE } from './store/products/products.state';
import { productsReducer } from './store/products/products.reducer';
import { CATALOG_FEATURE } from './pages/catalog/store/catalog.state';
import { catalogReducer } from './pages/catalog/store/catalog.reducer';
import { PRODUCTS_FILTER_FEATURE } from './components/products-filter/store/products-filter.state';
import { productsFilterReducer } from './components/products-filter/store/products-filter.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideRouter(routes),
        provideClientHydration(),
        provideAnimationsAsync(),
        importProvidersFrom(HttpClientModule),
        provideHttpClient(withFetch()),
        { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
        importProvidersFrom(TuiRootModule),
        provideStore(
            {},
            {
                runtimeChecks: {
                    strictStateImmutability: true,
                    strictActionImmutability: true,
                    strictStateSerializability: true,
                    strictActionSerializability: true,
                    strictActionWithinNgZone: true,
                    strictActionTypeUniqueness: true,
                },
            },
        ),
        provideState({
            name: ARTICLES_CARDS_FEATURE,
            reducer: articlesReducer,
        }),
        provideState({
            name: SLIDERS_FEATURE,
            reducer: slidresReducer,
        }),
        provideState({
            name: SERVICES_FEATURE,
            reducer: servicesReducer,
        }),
        provideState({
            name: PRODUCTS_FEATURE,
            reducer: productsReducer,
        }),
        provideState({
            name: CATALOG_FEATURE,
            reducer: catalogReducer,
        }),
        provideState({
            name: PRODUCTS_FILTER_FEATURE,
            reducer: productsFilterReducer,
        }),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
        provideEffects(
            articlesCardsEffects,
            slidersEffects,
            homeEffects,
            servicesEffects,
            productsEffects,
            catalogEffects,
            productsFilterEffects,
        ),
    ],
};
