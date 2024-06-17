import { InjectionToken } from '@angular/core';

export const STORE_HOURS = new InjectionToken<string>('Store hours', {
    factory: () => 'ВТ - СБ 10:00 - 19:00. ВС, ПН - Выходные',
});
