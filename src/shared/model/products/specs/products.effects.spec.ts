import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IProduct, ProductsService } from '@shared/api';
import { ProductsActions, ProductsApiActions } from '../products.actions';
import {
    loadProductsEffect,
    setProductsNamesProductsEffect,
} from '../products.effects';

describe('loadProductsEffect', () => {
    const productsMock: readonly IProduct[] = [
        {
            url: 'testUrl1',
            vendor_code: 1,
            name: 'testName1',
            price: 2,
            rating: 3,
            description: 'testDescription1',
            characteristics: [
                { value: 'testValue1', description: 'testDescription1' },
            ],
            photos: ['tesPhoto1', 'testPhoto2', 'testPhoto3'],
            category: 'testCategory1',
        },
        {
            url: 'testUrl2',
            vendor_code: 1,
            name: 'testName2',
            price: 2,
            rating: 3,
            description: 'testDescription2',
            characteristics: [
                { value: 'testValue2', description: 'testDescription2' },
            ],
            photos: ['tesPhoto4', 'testPhoto5', 'testPhoto6'],
            category: 'testCategory2',
        },
    ];
    let actionsMock$ = new Observable<Action>();

    it('loadProductsEffect should ProductsActions.addProducts', () => {
        return new Promise<void>((done) => {
            const productsServiceMock = {
                getProducts: () => of(productsMock),
            } as ProductsService;
            actionsMock$ = of(ProductsApiActions.loadProducts());

            loadProductsEffect(actionsMock$, productsServiceMock).subscribe(
                (action) => {
                    expect(action).toEqual(
                        ProductsActions.addProducts({
                            products: productsMock,
                        }),
                    );
                    done();
                },
            );
        });
    });

    it('setProductsNamesProductsEffect should ProductsActions.addProductsNames', () => {
        return new Promise<void>((done) => {
            actionsMock$ = of(
                ProductsActions.addProducts({ products: productsMock }),
            );

            setProductsNamesProductsEffect(actionsMock$).subscribe((action) => {
                expect(action).toEqual(
                    ProductsActions.addProductsNames({
                        productsNames: [
                            productsMock[0].name,
                            productsMock[1].name,
                        ],
                    }),
                );
                done();
            });
        });
    });
});
