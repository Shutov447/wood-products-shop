import { createReducer, on } from '@ngrx/store';
import { IProductsState, productsInitialState } from './products.state';
import { ProductsActions } from './products.actions';

export const productsReducer = createReducer(
    productsInitialState,
    on(ProductsActions.addProducts, (state, { products }): IProductsState => {
        const categories = [
            ...new Set(products.map((product) => product.category)),
        ];

        return {
            ...state,
            products,
            categories,
        };
    }),
);
