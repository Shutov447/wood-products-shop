import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    Subject,
    of,
    switchMap,
    takeUntil,
} from 'rxjs';
import { IProduct } from '../../../assets/products/types/product.interface';
import { IProductsFilterFn } from './shared/types/products-filter.interface';
import {
    IForFilteringProducts,
    IResultFilterData,
} from '../../../assets/products/types/for-filtering-products.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductsService implements OnDestroy {
    private readonly destroy$ = new Subject<void>();

    private readonly allProducts: IProduct[] = [];
    private readonly _products$ = new BehaviorSubject<IProduct[] | null>(null);
    readonly products$ = this._products$.asObservable();

    constructor(private readonly http: HttpClient) {
        this.http
            .get<IProduct[]>('assets/products/products-data.json')
            .pipe(takeUntil(this.destroy$))
            .subscribe((products) => {
                this.allProducts.push(...products);
                // this._products$.next(this.allProducts); попытка исправления бага(номер 13) из заметок
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

    getfilteringData(
        category: IProduct['category'],
    ): Observable<IResultFilterData> {
        return this.http
            .get<IForFilteringProducts>(
                'assets/products/for-filtering-products-data.json',
            )
            .pipe(
                switchMap((filteringData) => {
                    const allPrices: IProduct['price'][] = [];
                    const allRatings: IProduct['rating'][] = [];

                    this.allProducts.filter((product) => {
                        if (product.category === category) {
                            allPrices.push(product.price);
                            allRatings.push(product.rating);
                        }
                    });

                    const maxPrice = Math.max(...allPrices);
                    const maxRating = Math.max(...allRatings);

                    return of({
                        characteristics: filteringData[category],
                        ranges: [
                            {
                                title: 'price',
                                max: maxPrice,
                            },
                            {
                                title: 'rating',
                                max: maxRating,
                            },
                        ],
                    });
                }),
            );
    }
}
