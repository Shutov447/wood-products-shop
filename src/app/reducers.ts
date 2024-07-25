import { provideState } from '@ngrx/store';
import * as sharedModel from '@shared/model';

export const reducers = [
    provideState({
        name: sharedModel.ARTICLES_CARDS_FEATURE,
        reducer: sharedModel.articlesReducer,
    }),
    provideState({
        name: sharedModel.SLIDERS_FEATURE,
        reducer: sharedModel.slidersReducer,
    }),
    provideState({
        name: sharedModel.SERVICES_FEATURE,
        reducer: sharedModel.servicesReducer,
    }),
    provideState({
        name: sharedModel.PRODUCTS_FEATURE,
        reducer: sharedModel.productsReducer,
    }),
];
