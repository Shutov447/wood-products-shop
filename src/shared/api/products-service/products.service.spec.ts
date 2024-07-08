import { TestBed } from '@angular/core/testing';

import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { IProduct } from './types';

describe('ProductService', () => {
    let productsService: ProductsService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductsService],
        });

        productsService = TestBed.inject(ProductsService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    test('should be created', () => {
        expect(productsService).toBeTruthy();
    });

    describe('getProducts method', () => {
        test('запрос с методом GET должен вернуть поток с данными типа readonly IProduct[]', () => {
            let products: readonly IProduct[] | undefined;
            productsService.getProducts().subscribe((res) => {
                products = res;
            });

            const toFlash: readonly IProduct[] = [
                {
                    url: '',
                    vendor_code: 0,
                    name: '',
                    price: 0,
                    rating: 0,
                    description: '',
                    characteristics: [{ value: '', description: '' }],
                    photos: [''],
                    category: '',
                },
            ];
            const req = httpTestingController.expectOne(
                'assets/products/products-data.json',
            );
            req.flush(toFlash);

            expect(products).toEqual(toFlash);
            expect(req.request.method).toBe('GET');
        });
    });
});
