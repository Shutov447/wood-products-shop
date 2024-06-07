import { createReducer, on } from '@ngrx/store';
import { servicesInitialState } from './services.state';
import { ServicesActions } from './services.actions';
import { IServiceCard } from '../../../assets/service-card/types/service-card.interface';

export const servicesReducer = createReducer(
    servicesInitialState,
    on(
        ServicesActions.addServices,
        (_, { services }): readonly IServiceCard[] => services,
    ),
);
