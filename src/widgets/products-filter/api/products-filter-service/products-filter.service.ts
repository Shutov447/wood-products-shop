import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IForFilteringProducts } from '@shared/api';

@Injectable({
    providedIn: 'root',
})
export class ProductsFilterService {
    constructor(private readonly http: HttpClient) {}

    getDataForFilteringProducts() {
        return this.http.get<IForFilteringProducts>(
            'assets/products/for-filtering-products-data.json',
        );
    }
}
