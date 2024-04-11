import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from '../../../assets/products/types/product.interface';

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

    // в аргументах функции указать колбек filter
    getProducts(category: IProduct['category'], number?: number): IProduct[] {
        let currentProducts = this.products;
        currentProducts = currentProducts.filter(
            (product) => product.category === category,
        );

        if (number) {
            if (isNaN(number)) return [];

            return currentProducts.slice(0, number);
        }

        return currentProducts;
    }
}
