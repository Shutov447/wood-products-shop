import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProductsService } from '../../../../shared/products/products.service';

export const productGuard: CanActivateFn = (route) => {
    const product = route.paramMap.get('product');
    const router = inject(Router);
    const productsService = inject(ProductsService);
    const canNavigate = Boolean(
        product && productsService.productsNames.includes(product),
    );

    !canNavigate && router.navigateByUrl('/not-found');

    return canNavigate;
};
