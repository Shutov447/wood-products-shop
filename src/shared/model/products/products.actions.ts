import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProduct, IOutputFilterData } from '@shared/api';
import { PRODUCTS_API_FEATURE, PRODUCTS_FEATURE } from './products.state';

export const ProductsActions = createActionGroup({
    source: PRODUCTS_FEATURE,
    events: {
        addProducts: props<{ products: readonly IProduct[] }>(),
        filterByCategoryAndAmount: props<{
            category: IProduct['category'];
            amount: number;
        }>(),
        filterByOutputFilterData: props<IOutputFilterData>(),
        setCurrentChunk: props<{ currentChunk: readonly IProduct[] }>(),
        setCurrentProductByName: props<{ productName: IProduct['name'] }>(),
        addProductsNames: props<{
            productsNames: readonly IProduct['name'][];
        }>(),
    },
});

export const ProductsApiActions = createActionGroup({
    source: PRODUCTS_API_FEATURE,
    events: {
        loadProducts: emptyProps(),
    },
});
