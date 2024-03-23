import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
    HttpClientModule,
    provideHttpClient,
    withFetch,
} from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideRouter(routes),
        provideClientHydration(),
        provideAnimationsAsync(),
        importProvidersFrom(TuiRootModule),
        importProvidersFrom(HttpClientModule),
        provideHttpClient(withFetch()),
    ],
};
