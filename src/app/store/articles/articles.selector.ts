import { createFeatureSelector } from '@ngrx/store';
import { ARTICLES_FEATURE, IArticlesState } from './articles.state';

export const artilcesFeatureSelector =
    createFeatureSelector<IArticlesState>(ARTICLES_FEATURE);
