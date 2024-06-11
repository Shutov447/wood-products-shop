import {
    IForFilteringProducts,
    IResultFilterData,
} from '../../../../assets/products/types/for-filtering-products.interface';
import { IProduct } from '../../../../assets/products/types/product.interface';

export const PRODUCTS_FILTER_FEATURE = 'Products filter';
export const PRODUCTS_FILTER_API_FEATURE = 'Products filter api';

export interface IFilterInitialState {
    dtoFilteringData: IForFilteringProducts;
    filteringDataByCategory: IResultFilterData;
    currentCategory: IProduct['category'] | null;
}

export const productsFilterInitialState: IFilterInitialState = {
    dtoFilteringData: {},
    filteringDataByCategory: {
        characteristics: [],
        ranges: [],
    },
    currentCategory: null,
};
