import { InjectionToken } from '@angular/core';

export const TELEGRAM = new InjectionToken<string>('link to telegram', {
    factory: () => 'https://web.telegram.org',
});
