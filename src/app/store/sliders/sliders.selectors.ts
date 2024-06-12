import { createFeatureSelector } from '@ngrx/store';
import { ISliderData } from '../../../assets/slider/types/slider-data.interface';
import { SLIDERS_FEATURE } from './sliders.state';

export const selectSliders =
    createFeatureSelector<readonly ISliderData[]>(SLIDERS_FEATURE);
