import { IArticleCardData } from '../../../assets/article-card/types/article-card-data.interface';

export const ARTICLES_FEATURE = 'articles';

export interface IArticlesState {
    data: IArticleCardData[];
}

export const articlesInitialState: IArticlesState = {
    data: [],
};
