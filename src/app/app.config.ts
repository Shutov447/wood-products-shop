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
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
import { storeReducer } from './store/reducer';
import { routes } from './app.routes';

const devtoolsInstruments = [];

if (isDevMode()) {
    devtoolsInstruments.push(StoreDevtoolsModule.instrument());
}

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
        importProvidersFrom(StoreModule.forRoot(storeReducer)),
        importProvidersFrom(StoreDevtoolsModule.instrument()),
        importProvidersFrom(...devtoolsInstruments),
        importProvidersFrom(TranslateModule.forRoot({})),
    ],
};
