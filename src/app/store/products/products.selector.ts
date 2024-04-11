import { createFeatureSelector } from '@ngrx/store';
import { IProductsState, PRODUCTS_FEATURE } from './products.state';

export const productsFeatureSelector =
    createFeatureSelector<IProductsState>(PRODUCTS_FEATURE);
