import { IProduct } from '../../api';

export interface IProductsState {
    products: readonly IProduct[];
    categories: readonly IProduct['category'][];
    filteredProducts: readonly IProduct[];
    currentChunk: readonly IProduct[];
    currentProduct: IProduct | null | undefined;
    productsNames: readonly IProduct['name'][];
}

export const PRODUCTS_FEATURE = 'Products';
export const PRODUCTS_API_FEATURE = 'Products api';

export const productsInitialState: IProductsState = {
    products: [],
    categories: [],
    filteredProducts: [],
    currentChunk: [],
    currentProduct: null,
    productsNames: [],
};
