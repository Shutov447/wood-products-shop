import { createAction } from '@ngrx/store';
import { IProduct } from '../../../assets/products/types/product.interface';

export enum ProductsActionsType {
    addProducts = '[PRODUCTS_FEATURE] addProducts',
    addCategories = '[PRODUCTS_FEATURE] addCategories',
}

export const addProducts = createAction(
    ProductsActionsType.addProducts,
    (products: IProduct[]) => {
        return { products };
    },
);
