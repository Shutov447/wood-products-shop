import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IResultFilterData } from '@shared/api';
import { selectAllProducts } from '@shared/model';
import {
    IFilterInitialState,
    PRODUCTS_FILTER_FEATURE,
} from './products-filter.state';

export const selectProductsFilter = createFeatureSelector<IFilterInitialState>(
    PRODUCTS_FILTER_FEATURE,
);

export const selectFilteringDataForCurrentCategory = createSelector(
    selectProductsFilter,
    selectAllProducts,
    (
        { currentCategory, dtoFilteringData },
        products,
    ): IResultFilterData | null => {
        let maxPrice = 0;
        let maxRating = 0;

        products.forEach((product) => {
            if (product.category === currentCategory) {
                maxPrice = Math.max(maxPrice, product.price);
                maxRating = Math.max(maxRating, product.rating);
            }
        });

        return {
            characteristics:
                currentCategory && dtoFilteringData[currentCategory]
                    ? dtoFilteringData[currentCategory]
                    : [],
            ranges: [
                {
                    title: 'price',
                    max: maxPrice,
                },
                {
                    title: 'rating',
                    max: maxRating,
                },
            ],
        };

        // characteristics:
        //     currentCategory && dtoFilteringData[currentCategory]
        //         ? dtoFilteringData[currentCategory]
        //         : [],
        // ranges: products
        //     .filter((product) => product.category === currentCategory)
        //     .reduce(
        //         (acc, product) => ({
        //             price: Math.max(acc.price, product.price),
        //             rating: Math.max(acc.rating, product.rating),
        //         }),
        //         { price: 0, rating: 0 },
        //     ),
    },
);
