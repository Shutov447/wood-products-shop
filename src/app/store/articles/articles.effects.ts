import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of } from 'rxjs';
import { ArticlesCardService } from '../../shared/articles-card/articles-card.service';
import {
    ArticlesCardsActions,
    ArticlesCardsApiActions,
} from './articles.actions';

export const loadArticlesCardsEffect = createEffect(
    (
        actions$ = inject(Actions),
        articlesCardsService = inject(ArticlesCardService),
    ) => {
        return actions$.pipe(
            ofType(ArticlesCardsApiActions.loadArticlesCards),
            exhaustMap(() =>
                articlesCardsService.getArticlesCardsData().pipe(
                    map((articlesCards) =>
                        ArticlesCardsActions.addAllArticlesCards({
                            articlesCards,
                        }),
                    ),
                ),
            ),
        );
    },
    { functional: true },
);

export const loadArticlesCardsToCreateChunksEffect = createEffect(
    (
        actions$ = inject(Actions),
        articlesCardsService = inject(ArticlesCardService),
    ) => {
        return actions$.pipe(
            ofType(ArticlesCardsApiActions.loadArticlesCardsChunks),
            exhaustMap(({ chunkSize }) =>
                articlesCardsService.getArticlesCardsData().pipe(
                    map((articlesCards) =>
                        ArticlesCardsActions.createArticlesCardsChunks({
                            chunkSize,
                            articlesCards,
                        }),
                    ),
                ),
            ),
        );
    },
    { functional: true },
);

export const isLastArticleEffect = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(ArticlesCardsActions.createArticlesCardsChunks),
            exhaustMap(() => of(ArticlesCardsActions.setIsLastArticle())),
        );
    },
    { functional: true },
);
