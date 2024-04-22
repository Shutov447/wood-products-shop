import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from '../../../assets/products/types/product.interface';
import { IProductsFilterFn } from './shared/types/products-filter.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductsService implements OnDestroy {
    private readonly destroy$ = new Subject<void>();
    private products: IProduct[] = [];

    constructor(private readonly http: HttpClient) {
        this.http
            .get<IProduct[]>('assets/products/products-data.json')
            .pipe(takeUntil(this.destroy$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getProducts<FilterProductsArgs>(
        filterArgs: FilterProductsArgs,
        filterFn: IProductsFilterFn<FilterProductsArgs>,
    ): IProduct[] {
        return filterFn(this.products, filterArgs);
    }
}
