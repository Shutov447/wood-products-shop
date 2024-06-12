import { createReducer, on } from '@ngrx/store';
import { slidersInitialState } from './sliders.state';
import { SlidersActions } from './sliders.actions';
import { ISliderData } from '../../../assets/slider/types/slider-data.interface';

export const slidresReducer = createReducer(
    slidersInitialState,
    on(
        SlidersActions.addSliders,
        (_, { sliders }): readonly ISliderData[] => sliders,
    ),
);
