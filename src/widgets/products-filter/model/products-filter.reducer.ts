import { createReducer, on } from '@ngrx/store';
import {
    productsFilterInitialState,
    IFilterInitialState,
} from './products-filter.state';
import { ProductsFilterActions } from './products-filter.actions';

export const productsFilterReducer = createReducer(
    productsFilterInitialState,
    on(
        ProductsFilterActions.addFilteringDataForCategory,
        (state, { currentCategory }): IFilterInitialState => ({
            ...state,
            currentCategory,
        }),
    ),
    on(
        ProductsFilterActions.addDtoFilteringData,
        (state, { dtoFilteringData }): IFilterInitialState => ({
            ...state,
            dtoFilteringData,
        }),
    ),
);
