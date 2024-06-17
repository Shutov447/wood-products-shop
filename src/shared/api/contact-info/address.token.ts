import { InjectionToken } from '@angular/core';

export const ADDRESS = new InjectionToken<string>('address', {
    factory: () =>
        '123154, г. Москва, пр-т. Маршала Жукова, д. 52, "Мебельный Центр"',
});
