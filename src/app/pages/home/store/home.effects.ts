import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';
import { inject } from '@angular/core';
import { HomeActions } from './home.actions';
import { ArticlesCardsApiActions } from '../../../store/articles/articles.actions';
import { SlidersApiActions } from '../../../store/sliders/sliders.actions';
import { ServicesApiActions } from '../../../store/services/services.actions';

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
