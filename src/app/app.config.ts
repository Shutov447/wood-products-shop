import { provideAnimations } from '@angular/platform-browser/animations';
import { TUI_SANITIZER, TuiRootModule } from '@taiga-ui/core';
import {
    ApplicationConfig,
    importProvidersFrom,
    isDevMode,
    provideZoneChangeDetection,
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
import { routes } from '@pages';
import * as coreModel from '@shared/model';
import {
    CATALOG_FEATURE,
    catalogReducer,
    catalogEffects,
} from '@pages/catalog';
import {
    PRODUCTS_FILTER_FEATURE,
    productsFilterReducer,
    productsFilterEffects,
} from '@widgets/products-filter';
import { homeEffects } from '@pages/home';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideRouter(routes),
        provideClientHydration(),
        provideZoneChangeDetection({ eventCoalescing: true }),
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
            name: coreModel.ARTICLES_CARDS_FEATURE,
            reducer: coreModel.articlesReducer,
        }),
        provideState({
            name: coreModel.SLIDERS_FEATURE,
            reducer: coreModel.slidresReducer,
        }),
        provideState({
            name: coreModel.SERVICES_FEATURE,
            reducer: coreModel.servicesReducer,
        }),
        provideState({
            name: coreModel.PRODUCTS_FEATURE,
            reducer: coreModel.productsReducer,
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
            coreModel.articlesCardsEffects,
            coreModel.slidersEffects,
            homeEffects,
            coreModel.servicesEffects,
            coreModel.productsEffects,
            catalogEffects,
            productsFilterEffects,
        ),
    ],
};
