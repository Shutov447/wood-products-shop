import { IProduct } from '../../../../../assets/products/types/product.interface';
import { IProductsFilterFn } from '../types/products-filter.interface';

export const filterByCategory: IProductsFilterFn<IProduct['category']> = (
    products: IProduct[],
    category: IProduct['category'],
): IProduct[] => {
    products = products.filter((product) => product.category === category);

    return products;
};
