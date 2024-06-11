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
    on(
        ProductsActions.filterByCategoryAndAmount,
        (state, { category, amount }): IProductsState => {
            if (isNaN(amount))
                return {
                    ...state,
                    filteredProducts: [],
                };

            const filteredProducts = state.products
                .filter((product) => product.category === category)
                .slice(0, amount);

            return {
                ...state,
                filteredProducts,
            };
        },
    ),
);
