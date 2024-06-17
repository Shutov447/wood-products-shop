import { InjectionToken } from '@angular/core';

export const PINTEREST = new InjectionToken<string>('link to pinterest', {
    factory: () => 'https://ru.pinterest.com',
});
