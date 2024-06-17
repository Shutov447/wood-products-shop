import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';
import { inject } from '@angular/core';
import {
    ArticlesCardsApiActions,
    SlidersApiActions,
    ServicesApiActions,
} from '@app/core';
import { HomeActions } from './home.actions';

export const loadArticlesCardsChunksEffect = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(HomeActions.pageWithHomeComponentOpened),
            exhaustMap(({ chunkSize }) =>
                of(
                    ArticlesCardsApiActions.loadArticlesCardsChunks({
                        chunkSize,
                    }),
                ),
            ),
        );
    },
    { functional: true },
);

export const loadSlidersEffect = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(HomeActions.pageWithHomeComponentOpened),
            exhaustMap(() => of(SlidersApiActions.loadSliders())),
        );
    },
    { functional: true },
);

export const loadServicesEffect = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(HomeActions.pageWithHomeComponentOpened),
            exhaustMap(() => of(ServicesApiActions.loadServices())),
        );
    },
    { functional: true },
);
