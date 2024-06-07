import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SLIDERS_API_FEATURE, SLIDERS_FEATURE } from './sliders.state';
import { ISliderData } from '../../../assets/slider/types/slider-data.interface';

export const SlidersActions = createActionGroup({
    source: SLIDERS_FEATURE,
    events: {
        addSliders: props<{ sliders: readonly ISliderData[] }>(),
    },
});

export const SlidersApiActions = createActionGroup({
    source: SLIDERS_API_FEATURE,
    events: {
        loadSliders: emptyProps(),
    },
});
