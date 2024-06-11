import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    PRODUCTS_API_FEATURE,
    PRODUCTS_FEATURE,
} from '../../../store/products/products.state';
import { IForFilteringProducts } from '../../../../assets/products/types/for-filtering-products.interface';
import { IProduct } from '../../../../assets/products/types/product.interface';

export const ProductsFilterActions = createActionGroup({
    source: PRODUCTS_FEATURE,
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
    source: PRODUCTS_API_FEATURE,
    events: {
        loadDtoFilteringData: emptyProps(),
        pageWithFilterDataOpened: props<{
            currentCategory: IProduct['category'];
        }>(),
    },
});
