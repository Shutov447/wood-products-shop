import { InjectionToken } from '@angular/core';

export const PHONE_NUMBER = new InjectionToken<string>('Phone number', {
    factory: () => '8 (800) 550-81-79',
});
