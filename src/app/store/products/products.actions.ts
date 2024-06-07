import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProduct } from '../../../assets/products/types/product.interface';
import { PRODUCTS_API_FEATURE, PRODUCTS_FEATURE } from './products.state';

export const ProductsActions = createActionGroup({
    source: PRODUCTS_FEATURE,
    events: {
        addProducts: props<{ products: readonly IProduct[] }>(),
    },
});

export const ProductsApiActions = createActionGroup({
    source: PRODUCTS_API_FEATURE,
    events: {
        loadProducts: emptyProps(),
    },
});
