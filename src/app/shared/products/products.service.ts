import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { IProduct } from '../../../assets/products/types/product.interface';
import { IProductsFilterFn } from './shared/types/products-filter.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductsService implements OnDestroy {
    private readonly destroy$ = new Subject<void>();

    private readonly allProducts: IProduct[] = [];
    private readonly _products$ = new BehaviorSubject<IProduct[] | null>(null);
    readonly products$ = this._products$.asObservable();

    private readonly _productsNames: IProduct['name'][] = [];
    get productsNames() {
        return this._productsNames;
    }

    constructor(private readonly http: HttpClient) {
        this.http
            .get<IProduct[]>('assets/products/products-data.json')
            .pipe(takeUntil(this.destroy$))
            .subscribe((products) => {
                this.allProducts.push(...products);
                products.map((product) => {
                    this._productsNames.push(product.name);
                });
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    filterProducts$<FilterProductsArgs>(
        filterArgs: FilterProductsArgs,
        filterFn: IProductsFilterFn<FilterProductsArgs>,
    ) {
        const newProducts = filterFn(this.allProducts, filterArgs);
        this._products$.next(newProducts);
    }

    private readonly _product$ = new BehaviorSubject<IProduct | null>(null);
    readonly product$ = this._product$.asObservable();

    getProductByName(characteristicName: string) {
        const product = this.allProducts.find(
            (elem) => elem.name === characteristicName,
        );

        product && this._product$.next(product);
    }
}
