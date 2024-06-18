import { createFeatureSelector } from '@ngrx/store';
import { ISliderData } from '@shared/api';
import { SLIDERS_FEATURE } from './sliders.state';

export const selectSliders =
    createFeatureSelector<readonly ISliderData[]>(SLIDERS_FEATURE);
