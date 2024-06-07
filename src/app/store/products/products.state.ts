import { IProduct } from '../../../assets/products/types/product.interface';

export interface IProductsState {
    products: readonly IProduct[];
    categories: readonly IProduct['category'][];
}

export const PRODUCTS_FEATURE = 'Products';
export const PRODUCTS_API_FEATURE = 'Products api';

export const productsInitialState: IProductsState = {
    products: [],
    categories: [],
};
