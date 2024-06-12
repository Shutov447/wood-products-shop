import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    IFilterInitialState,
    PRODUCTS_FILTER_FEATURE,
} from './products-filter.state';
import { IProduct } from '../../../../assets/products/types/product.interface';
import { selectAllProducts } from '../../../store/products/products.selectors';
import { IResultFilterData } from '../../../../assets/products/types/for-filtering-products.interface';

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
