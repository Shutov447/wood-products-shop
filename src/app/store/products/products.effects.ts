import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { ProductsService } from '../../shared/products/products-service/products.service';
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
