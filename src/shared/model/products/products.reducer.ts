import { createReducer, on } from '@ngrx/store';
import { concat, isFinite } from 'lodash';
import { IChosenData, IOutputRangeData } from '@shared/components';
import { IProductsState, productsInitialState } from './products.state';
import { ProductsActions } from './products.actions';
import { filterProductByFilterData } from './filter-functions';

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
            if (!isFinite(amount))
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
    on(
        ProductsActions.filterByOutputFilterData,
        (state, { category, choices, ranges }): IProductsState => {
            const characteristics = concat<IChosenData | IOutputRangeData>(
                choices,
                ranges,
            );

            const filteredProducts = state.products.filter((product) => {
                const isCategoryMatch = product.category === category;

                return (
                    isCategoryMatch &&
                    filterProductByFilterData(product, characteristics)
                );
            });

            return {
                ...state,
                filteredProducts,
            };
        },
    ),
    on(
        ProductsActions.setCurrentChunk,
        (state, { currentChunk }): IProductsState => ({
            ...state,
            currentChunk,
        }),
    ),
    on(
        ProductsActions.setCurrentProductByName,
        (state, { productName }): IProductsState => {
            const currentProduct = state.products.find(
                (product) => product.name === productName,
            );

            return {
                ...state,
                currentProduct,
            };
        },
    ),
    on(
        ProductsActions.addProductsNames,
        (state, { productsNames }): IProductsState => ({
            ...state,
            productsNames,
        }),
    ),
);
