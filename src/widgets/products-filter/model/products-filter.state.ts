import {
    IForFilteringProducts,
    IResultFilterData,
    IProduct,
} from '@shared/api';

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
