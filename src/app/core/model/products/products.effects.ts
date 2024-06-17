import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of } from 'rxjs';
import { ProductsService } from '@shared/api';
import { ProductsActions, ProductsApiActions } from './products.actions';

export const loadProductsEffect = createEffect(
    (actions$ = inject(Actions), productsService = inject(ProductsService)) => {
        return actions$.pipe(
            ofType(ProductsApiActions.loadProducts),
            exhaustMap(() =>
                productsService
                    .getProducts()
                    .pipe(
                        map((products) =>
                            ProductsActions.addProducts({ products }),
                        ),
                    ),
            ),
        );
    },
    { functional: true },
);

export const setProductsNamesProductsEffect = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(ProductsActions.addProducts),
            exhaustMap(({ products }) => {
                const productsNames = products.map((product) => product.name);

                return of(ProductsActions.addProductsNames({ productsNames }));
            }),
        );
    },
    { functional: true },
);
