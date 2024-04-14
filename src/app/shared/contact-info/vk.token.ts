import { InjectionToken } from '@angular/core';

export const VK = new InjectionToken<string>('link to vk', {
    factory: () => 'https://vk.com',
});
