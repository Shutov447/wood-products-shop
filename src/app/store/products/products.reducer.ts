import { createReducer, on } from '@ngrx/store';
import { addProducts } from './products.actions';
import { productsAdapter, productsInitialState } from './products.state';

export const productsReducer = createReducer(
    productsInitialState,
    on(addProducts, (state, { products }) => {
        const newState = productsAdapter.setAll(products, state);
        const categories = [
            ...new Set(products.map((product) => product.category)),
        ];

        return {
            ...newState,
            categories: categories,
        };
    }),
);
