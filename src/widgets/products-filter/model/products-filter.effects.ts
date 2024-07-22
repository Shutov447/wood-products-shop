import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { ProductsFilterService } from '../api';
import {
    ProductsFilterActions,
    ProductsFilterApiActions,
} from './products-filter.actions';

export const loadFilteringDataEffect = createEffect(
    (
        actions$ = inject(Actions),
        productsFilterService = inject(ProductsFilterService),
    ) => {
        return actions$.pipe(
            ofType(ProductsFilterApiActions.pageWithFilterDataOpened),
            exhaustMap(() =>
                productsFilterService.getDataForFilteringProducts().pipe(
                    map((dtoFilteringData) =>
                        ProductsFilterActions.addDtoFilteringData({
                            dtoFilteringData,
                        }),
                    ),
                ),
            ),
        );
    },
    { functional: true },
);
