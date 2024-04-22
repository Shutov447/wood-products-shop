import { IProduct } from '../../../../../assets/products/types/product.interface';

export interface IProductsFilterFn<FilterProductsArgs> {
    (products: IProduct[], args: FilterProductsArgs): IProduct[];
}
