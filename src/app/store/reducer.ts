import { articlesReducer } from './articles/articles.reducer';
import { ARTICLES_FEATURE, IArticlesState } from './articles/articles.state';

export interface IState {
    [ARTICLES_FEATURE]: IArticlesState;
}

export const storeReducer = {
    [ARTICLES_FEATURE]: articlesReducer,
};
