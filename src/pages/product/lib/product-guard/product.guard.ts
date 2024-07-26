import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectHaveProduct } from '@shared/model';
import { take } from 'rxjs';

export const productGuard: CanActivateFn = (route) => {
    const productName = route.paramMap.get('product');
    const router = inject(Router);
    const store = inject(Store);
    let canNavigate = false;

    store
        .select(selectHaveProduct)
        .pipe(take(1))
        .subscribe((haveProduct) => {
            canNavigate = Boolean(haveProduct && productName);

            !canNavigate && router.navigateByUrl('/not-found');
        });

    return canNavigate;
};
