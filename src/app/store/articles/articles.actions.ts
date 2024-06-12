import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    ARTICLES_CARDS_API_FEATURE,
    ARTICLES_CARDS_FEATURE,
} from './articles.state';
import { IArticleCardData } from '../../../assets/article-card/types/article-card-data.interface';

export const ArticlesCardsActions = createActionGroup({
    source: ARTICLES_CARDS_FEATURE,
    events: {
        addAllArticlesCards: props<{
            articlesCards: readonly IArticleCardData[];
        }>(),
        createArticlesCardsChunks: props<{
            articlesCards: readonly IArticleCardData[];
            chunkSize: number;
        }>(),
        addChunkToAccumulating: props<{
            chunkNumber: number;
        }>(),
        setIsLastArticle: emptyProps(),
    },
});

export const ArticlesCardsApiActions = createActionGroup({
    source: ARTICLES_CARDS_API_FEATURE,
    events: {
        loadArticlesCards: emptyProps(),
        loadArticlesCardsChunks: props<{
            chunkSize: number;
        }>(),
    },
});
