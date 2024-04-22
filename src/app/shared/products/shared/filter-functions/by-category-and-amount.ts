import { IProduct } from '../../../../../assets/products/types/product.interface';
import { IProductsFilterFn } from '../types/products-filter.interface';

export interface ICategoryAndAmount {
    category: IProduct['category'];
    amount: number;
}

export const filterByCategoryAndAmount: IProductsFilterFn<
    ICategoryAndAmount
> = (products: IProduct[], args: ICategoryAndAmount): IProduct[] => {
    products = products.filter((product) => product.category === args.category);

    if (isNaN(args.amount)) return [];

    return products.slice(0, args.amount);
};
