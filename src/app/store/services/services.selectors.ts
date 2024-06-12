import { createFeatureSelector } from '@ngrx/store';
import { IServiceCard } from '../../../assets/service-card/types/service-card.interface';
import { SERVICES_FEATURE } from './services.state';

export const selectServices =
    createFeatureSelector<readonly IServiceCard[]>(SERVICES_FEATURE);
