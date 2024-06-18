import { createFeatureSelector } from '@ngrx/store';
import { IServiceCard } from '../../api';
import { SERVICES_FEATURE } from './services.state';

export const selectServices =
    createFeatureSelector<readonly IServiceCard[]>(SERVICES_FEATURE);
