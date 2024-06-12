import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProduct } from '../../../assets/products/types/product.interface';
import { PRODUCTS_API_FEATURE, PRODUCTS_FEATURE } from './products.state';
import { IOutputFilterData } from '../../components/products-filter/shared/types/output-filter-data.interface';

export const ProductsActions = createActionGroup({
    source: PRODUCTS_FEATURE,
    events: {
        addProducts: props<{ products: readonly IProduct[] }>(),
        filterByCategoryAndAmount: props<{
            category: IProduct['category'];
            amount: number;
        }>(),
        filterByOutputFilterData: props<IOutputFilterData>(),
    },
});

export const ProductsApiActions = createActionGroup({
    source: PRODUCTS_API_FEATURE,
    events: {
        loadProducts: emptyProps(),
    },
});
