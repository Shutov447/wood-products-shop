import { InjectionToken } from '@angular/core';

export const SUPPORT_EMAIL = new InjectionToken<string>('Support email', {
    factory: () => 'support@sofiadoors.com',
});
