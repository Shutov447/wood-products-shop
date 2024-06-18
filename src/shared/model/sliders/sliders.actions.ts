import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ISliderData } from '@shared/api';
import { SLIDERS_API_FEATURE, SLIDERS_FEATURE } from './sliders.state';

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
