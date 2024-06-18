import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProduct, IResultFilterData } from '@shared/api';
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
        const allPrices: IProduct['price'][] = [];
        const allRatings: IProduct['rating'][] = [];

        products.filter((product) => {
            if (product.category === currentCategory) {
                allPrices.push(product.price);
                allRatings.push(product.rating);
            }
        });

        const maxPrice = Math.max(...allPrices);
        const maxRating = Math.max(...allRatings);

        if (currentCategory && dtoFilteringData[currentCategory])
            return {
                characteristics: dtoFilteringData[currentCategory],
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

        return {
            characteristics: [],
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
    },
);
