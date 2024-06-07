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
import { SLIDERS_FEATURE } from './store/sliders/sliders.state';
import { slidresReducer } from './store/sliders/sliders.reducer';
import { SERVICES_FEATURE } from './store/services/services.state';
import { servicesReducer } from './store/services/services.reducer';

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
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
        provideEffects(
            articlesCardsEffects,
            slidersEffects,
            homeEffects,
            servicesEffects,
        ),
    ],
};
