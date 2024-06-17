import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectHaveProduct } from '@app/core';

export const productGuard: CanActivateFn = (route) => {
    const productName = route.paramMap.get('product');
    const router = inject(Router);
    const store = inject(Store);
    const canNavigate = Boolean(productName && store.select(selectHaveProduct));

    !canNavigate && router.navigateByUrl('/not-found');

    return canNavigate;
};
