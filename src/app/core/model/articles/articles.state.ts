import { IArticleCardData } from '@assets/article-card/types/article-card-data.interface';

export interface IArticlesCardsInitialState {
    allArticlesCards: readonly IArticleCardData[];
    chunks: readonly IArticleCardData[][];
    accumulatingChunk: readonly IArticleCardData[];
    isLastArticle: boolean;
}

export const ARTICLES_CARDS_FEATURE = 'Articles cards';
export const ARTICLES_CARDS_API_FEATURE = 'Articles cards api';

export const articlesCardsInitialState: IArticlesCardsInitialState = {
    allArticlesCards: [],
    chunks: [],
    accumulatingChunk: [],
    isLastArticle: false,
};
