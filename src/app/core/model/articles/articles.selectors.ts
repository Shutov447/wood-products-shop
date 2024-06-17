import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    ARTICLES_CARDS_FEATURE,
    IArticlesCardsInitialState,
} from './articles.state';

export const selectArticles = createFeatureSelector<IArticlesCardsInitialState>(
    ARTICLES_CARDS_FEATURE,
);

export const selectAllArticles = createSelector(
    selectArticles,
    (state) => state.allArticlesCards,
);

export const selectArticlesCardsChunks = createSelector(
    selectArticles,
    (state) => state.chunks,
);

export const selectAccumulatingChunk = createSelector(
    selectArticles,
    (state) => state.accumulatingChunk,
);

export const selectIsLastArticle = createSelector(
    selectArticles,
    (state) => state.isLastArticle,
);
