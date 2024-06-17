import { InjectionToken } from '@angular/core';

export const METRO_STATION = new InjectionToken<string>('metro station', {
    factory: () => 'м. Полежаевская',
});
