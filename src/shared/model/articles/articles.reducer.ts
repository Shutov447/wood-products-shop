import { createReducer, on } from '@ngrx/store';
import { chunk } from 'lodash';
import {
    IArticlesCardsInitialState,
    articlesCardsInitialState,
} from './articles.state';
import { ArticlesCardsActions } from './articles.actions';

export const articlesReducer = createReducer(
    articlesCardsInitialState,
    on(
        ArticlesCardsActions.addAllArticlesCards,
        (state, { articlesCards }): IArticlesCardsInitialState => ({
            ...state,
            allArticlesCards: articlesCards,
        }),
    ),
    on(
        ArticlesCardsActions.createArticlesCardsChunks,
        (state, { chunkSize, articlesCards }): IArticlesCardsInitialState => {
            const chunks = chunk(articlesCards, chunkSize);

            return {
                ...state,
                chunks,
                allArticlesCards: articlesCards,
                accumulatingChunk: chunks[0],
                isLastArticle: false,
            };
        },
    ),
    on(
        ArticlesCardsActions.addChunkToAccumulating,
        (state, { chunkNumber }): IArticlesCardsInitialState => {
            const isLastArticle = chunkNumber >= state.chunks.length - 1;

            if (chunkNumber >= state.chunks.length && chunkNumber > 0)
                return state;

            return {
                ...state,
                isLastArticle,
                accumulatingChunk: [
                    ...state.accumulatingChunk,
                    ...state.chunks[chunkNumber],
                ],
            };
        },
    ),
    on(
        ArticlesCardsActions.setIsLastArticle,
        (state): IArticlesCardsInitialState => {
            if (
                state.allArticlesCards.length === state.accumulatingChunk.length
            )
                return {
                    ...state,
                    isLastArticle: true,
                };

            return state;
        },
    ),
);
