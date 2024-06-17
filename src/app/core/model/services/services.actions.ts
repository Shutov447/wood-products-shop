import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IServiceCard } from '@assets/service-card/types/service-card.interface';
import { SERVICES_API_FEATURE, SERVICES_FEATURE } from './services.state';

export const ServicesActions = createActionGroup({
    source: SERVICES_FEATURE,
    events: {
        addServices: props<{ services: readonly IServiceCard[] }>(),
    },
});

export const ServicesApiActions = createActionGroup({
    source: SERVICES_API_FEATURE,
    events: {
        loadServices: emptyProps(),
    },
});
