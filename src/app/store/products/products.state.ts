import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { IProduct } from '../../../assets/products/types/product.interface';

export const PRODUCTS_FEATURE = 'products';

export interface IProductsState extends EntityState<IProduct> {
    categories: Array<IProduct['category']> | null;
}

export const productsAdapter = createEntityAdapter<IProduct>({
    selectId: ({ vendor_code }: IProduct) => vendor_code,
});

export const productsInitialState: IProductsState =
    productsAdapter.getInitialState({
        categories: null,
    });
