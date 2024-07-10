import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectCategories } from '@shared/model';
import { CATALOG_FEATURE } from './catalog.state';

interface ICategoryData {
    category: string;
    introImg: string;
}

export const selectCatalog =
    createFeatureSelector<Record<string, string>>(CATALOG_FEATURE);

export const selectCategoriesData = createSelector(
    selectCatalog,
    selectCategories,
    (introImgs, categories) => {
        const categoryData: ICategoryData[] = [];
        const formattedCategories = categories.map((category) =>
            category.toLowerCase(),
        );

        Object.keys(introImgs).forEach((introImg) => {
            const formattedIntroImgCategory = introImg.toLowerCase();

            formattedCategories.forEach((category) => {
                if (formattedIntroImgCategory === category)
                    categoryData.push({
                        category,
                        introImg: introImgs[formattedIntroImgCategory],
                    });
            });
        });

        return categoryData;
    },
);
