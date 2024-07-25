import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CATALOG_API_FEATURE, CATALOG_FEATURE } from './catalog.state';

export const CatalogActions = createActionGroup({
    source: CATALOG_FEATURE,
    events: {
        addCategoryIntroImg: props<{ introImgs: Record<string, string> }>(),
    },
});

export const CatalogApiActions = createActionGroup({
    source: CATALOG_API_FEATURE,
    events: {
        loadCategoryIntroImg: emptyProps(),
    },
});
