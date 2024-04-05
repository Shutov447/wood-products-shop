import { createAction } from '@ngrx/store';
import { IArticleCardData } from '../../../assets/article-card/types/article-card-data.interface';

export enum ArticlesActionsType {
    addArticles = '[ARTICLES_FEATURE] addArticles',
}

export const addArticles = createAction(
    ArticlesActionsType.addArticles,
    (articles: IArticleCardData[]) => ({ articles }),
);
