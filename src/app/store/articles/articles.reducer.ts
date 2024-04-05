import { createReducer, on } from '@ngrx/store';
import { articlesInitialState } from './articles.state';
import { addArticles } from './articles.actions';

export const articlesReducer = createReducer(
    articlesInitialState,
    on(addArticles, (state, action) => ({
        ...state,
        data: action.articles,
    })),
);
