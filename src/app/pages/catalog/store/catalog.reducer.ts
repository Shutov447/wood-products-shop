import { createReducer, on } from '@ngrx/store';
import { catalogInitialState } from './catalog.state';
import { CatalogActions } from './catalog.actions';

export const catalogReducer = createReducer(
    catalogInitialState,
    on(
        CatalogActions.addCategryIntroImg,
        (_, { introImgs }): Record<string, string> => introImgs,
    ),
);
