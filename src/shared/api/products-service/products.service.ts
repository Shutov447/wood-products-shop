import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '@shared/api';

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
