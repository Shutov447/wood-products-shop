import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SERVICES_API_FEATURE, SERVICES_FEATURE } from './services.state';
import { IServiceCard } from '../../../assets/service-card/types/service-card.interface';

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
