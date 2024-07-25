import { createReducer, on } from '@ngrx/store';
import { ISliderData } from '@shared/api';
import { slidersInitialState } from './sliders.state';
import { SlidersActions } from './sliders.actions';

export const slidersReducer = createReducer(
    slidersInitialState,
    on(
        SlidersActions.addSliders,
        (_, { sliders }): readonly ISliderData[] => sliders,
    ),
);
