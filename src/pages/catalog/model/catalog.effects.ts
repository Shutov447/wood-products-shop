import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { CatalogService } from '../api';
import { CatalogActions, CatalogApiActions } from './catalog.actions';

export const loadCategoriesIntroImgs = createEffect(
    (actions$ = inject(Actions), catalogService = inject(CatalogService)) => {
        return actions$.pipe(
            ofType(CatalogApiActions.loadCategoryIntroImg),
            exhaustMap(() =>
                catalogService
                    .getCategoriesIntroImgs()
                    .pipe(
                        map((introImgs) =>
                            CatalogActions.addCategoryIntroImg({ introImgs }),
                        ),
                    ),
            ),
        );
    },
    { functional: true },
);
