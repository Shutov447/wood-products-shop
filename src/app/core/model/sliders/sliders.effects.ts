import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { SlidersDataService } from '@shared/api';
import { SlidersActions, SlidersApiActions } from './sliders.actions';

export const loadSlidersEffect = createEffect(
    (
        actions$ = inject(Actions),
        slidersDataService = inject(SlidersDataService),
    ) => {
        return actions$.pipe(
            ofType(SlidersApiActions.loadSliders),
            exhaustMap(() =>
                slidersDataService
                    .getSlidersData()
                    .pipe(
                        map((sliders) =>
                            SlidersActions.addSliders({ sliders }),
                        ),
                    ),
            ),
        );
    },
    { functional: true },
);
