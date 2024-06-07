import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProductsState, PRODUCTS_FEATURE } from './products.state';

export const selectProducts =
    createFeatureSelector<IProductsState>(PRODUCTS_FEATURE);

export const selectAllProducts = createSelector(
    selectProducts,
    (state) => state.products,
);

export const selectCategories = createSelector(
    selectProducts,
    (state) => state.categories,
);
