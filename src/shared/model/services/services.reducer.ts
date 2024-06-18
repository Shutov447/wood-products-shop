import { createReducer, on } from '@ngrx/store';
import { IServiceCard } from '../../api';
import { servicesInitialState } from './services.state';
import { ServicesActions } from './services.actions';

export const servicesReducer = createReducer(
    servicesInitialState,
    on(
        ServicesActions.addServices,
        (_, { services }): readonly IServiceCard[] => services,
    ),
);
