import { createReducer, on } from '@ngrx/store';
import { concat } from 'lodash';
import { IProductsState, productsInitialState } from './products.state';
import { ProductsActions } from './products.actions';
import { IChosenData } from '../../components/custom-input/shared/types/characteristic-data.interface';
import { IOutputRangeData } from '../../components/custom-input/shared/types/input-range-data.interface';
import { filterProduct } from '../../shared/products/shared/filter-functions/by-output-filter-data';

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
                    isCategoryMatch && filterProduct(product, characteristics)
                );
            });

            return {
                ...state,
                filteredProducts,
            };
        },
    ),
);
