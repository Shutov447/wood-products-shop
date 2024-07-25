import { provideEffects } from '@ngrx/effects';
import { homeEffects } from '@pages/home';
import * as sharedModel from '@shared/model';

export const effects = provideEffects(
    sharedModel.articlesCardsEffects,
    sharedModel.slidersEffects,
    homeEffects,
    sharedModel.servicesEffects,
    sharedModel.productsEffects,
);
