import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IForFilteringProducts, IProduct } from '@shared/api';
import {
    PRODUCTS_FILTER_API_FEATURE,
    PRODUCTS_FILTER_FEATURE,
} from './products-filter.state';

export const ProductsFilterActions = createActionGroup({
    source: PRODUCTS_FILTER_FEATURE,
    events: {
        addDtoFilteringData: props<{
            dtoFilteringData: IForFilteringProducts;
        }>(),
        addFilteringDataForCategory: props<{
            currentCategory: IProduct['category'];
        }>(),
    },
});

export const ProductsFilterApiActions = createActionGroup({
    source: PRODUCTS_FILTER_API_FEATURE,
    events: {
        pageWithFilterDataOpened: emptyProps(),
    },
});
