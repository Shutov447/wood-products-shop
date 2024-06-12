import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { CatalogService } from '../shared/catalog-service/catalog.service';
import { CatalogActions, CatalogApiActions } from './catalog.actions';

export const loadCategoriesIntroImgs = createEffect(
    (actions$ = inject(Actions), catalogService = inject(CatalogService)) => {
        return actions$.pipe(
            ofType(CatalogApiActions.loadCategryIntroImg),
            exhaustMap(() =>
                catalogService
                    .getCategoriesIntroImgs()
                    .pipe(
                        map((introImgs) =>
                            CatalogActions.addCategryIntroImg({ introImgs }),
                        ),
                    ),
            ),
        );
    },
    { functional: true },
);
