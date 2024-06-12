import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../../../../assets/products/types/product.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private readonly http: HttpClient) {}

    getProducts() {
        return this.http.get<readonly IProduct[]>(
            'assets/products/products-data.json',
        );
    }
}
