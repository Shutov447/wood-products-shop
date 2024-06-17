import { createReducer, on } from '@ngrx/store';
import { IServiceCard } from '@assets/service-card/types/service-card.interface';
import { servicesInitialState } from './services.state';
import { ServicesActions } from './services.actions';

export const servicesReducer = createReducer(
    servicesInitialState,
    on(
        ServicesActions.addServices,
        (_, { services }): readonly IServiceCard[] => services,
    ),
);
