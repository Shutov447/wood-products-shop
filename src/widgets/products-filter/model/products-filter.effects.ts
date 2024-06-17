import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of } from 'rxjs';
import { ProductsFilterService } from '../api/products-filter-service/products-filter.service';
import {
    ProductsFilterActions,
    ProductsFilterApiActions,
} from './products-filter.actions';

export const pageWithFilterDataOpenedEffect = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(ProductsFilterApiActions.pageWithFilterDataOpened),
            exhaustMap(() =>
                of(ProductsFilterApiActions.loadDtoFilteringData()),
            ),
        );
    },
    { functional: true },
);

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

export const addFilteringDataForCategoryEffect = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(ProductsFilterApiActions.pageWithFilterDataOpened),
            exhaustMap(({ currentCategory }) =>
                of(
                    ProductsFilterActions.addFilteringDataForCategory({
                        currentCategory,
                    }),
                ),
            ),
        );
    },
    { functional: true },
);
