import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { IState } from '../../../../store/reducer';
import { productsFeatureSelector } from '../../../../store/products/products.selector';

export const categoryGuard: CanActivateFn = (route) => {
    const category = route.paramMap.get('category');
    const store$ = inject(Store<IState>);
    const router = inject(Router);
    let canNavigate = false;

    store$
        .pipe(
            take(1),
            select(productsFeatureSelector),
            map(({ categories }) => categories),
        )
        .subscribe((categories) => {
            if (categories && category)
                canNavigate = categories?.includes(category);
        });

    !canNavigate && router.navigateByUrl('/not-found');

    return canNavigate;
};
