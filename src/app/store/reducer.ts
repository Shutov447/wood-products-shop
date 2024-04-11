import { articlesReducer } from './articles/articles.reducer';
import { ARTICLES_FEATURE, IArticlesState } from './articles/articles.state';
import { productsReducer } from './products/products.reducer';
import { IProductsState, PRODUCTS_FEATURE } from './products/products.state';

export interface IState {
    [ARTICLES_FEATURE]: IArticlesState;
    [PRODUCTS_FEATURE]: IProductsState;
}

export const storeReducer = {
    [ARTICLES_FEATURE]: articlesReducer,
    [PRODUCTS_FEATURE]: productsReducer,
};
