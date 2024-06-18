import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { selectCategories } from '@shared/model';

export const categoryGuard: CanActivateFn = (route) => {
    const category = route.paramMap.get('category');
    const store = inject(Store);
    const router = inject(Router);
    let canNavigate = false;

    store
        .select(selectCategories)
        .pipe(take(1))
        .subscribe((categories) => {
            if (categories && category)
                canNavigate = categories?.includes(category);

            !canNavigate && router.navigateByUrl('/not-found');
        });

    return canNavigate;
};
