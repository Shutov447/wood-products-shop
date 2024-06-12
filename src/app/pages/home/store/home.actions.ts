import { createActionGroup, props } from '@ngrx/store';
import { HOME_FEATURE } from './home.state';

export const HomeActions = createActionGroup({
    source: HOME_FEATURE,
    events: {
        pageWithHomeComponentOpened: props<{ chunkSize: number }>(),
    },
});
