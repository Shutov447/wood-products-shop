import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectCategories } from '@app/core';
import { CATALOG_FEATURE } from './catalog.state';

interface ICateroryData {
    category: string;
    introImg: string;
}

export const selectCatalog =
    createFeatureSelector<Record<string, string>>(CATALOG_FEATURE);

export const selectCategoriesData = createSelector(
    selectCatalog,
    selectCategories,
    (introImgs, categories) => {
        const categoryData: ICateroryData[] = [];
        const formattedCategories = categories.map((category) =>
            category.toLowerCase(),
        );

        Object.keys(introImgs).map((introImg) => {
            const formattedIntroImgCategory = introImg.toLowerCase();

            formattedCategories.map((category) => {
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
