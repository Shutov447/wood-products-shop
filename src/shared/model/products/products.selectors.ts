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

export const selectFilteredProducts = createSelector(
    selectProducts,
    (state) => state.filteredProducts,
);

export const selectCurrentChunkProducts = createSelector(
    selectProducts,
    (state) => state.currentChunk,
);

export const selectCurrentProduct = createSelector(
    selectProducts,
    (state) => state.currentProduct,
);

export const selectHaveProduct = createSelector(selectProducts, (state) => {
    const productName = state.currentProduct?.name;

    return Boolean(productName && state.productsNames.includes(productName));
});
