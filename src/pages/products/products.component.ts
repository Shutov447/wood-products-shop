import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { LetDirective, PushPipe } from '@ngrx/component';
import { UrlSegmentsVisualizerComponent } from '@features/url-segments-visualizer';
import {
    ProductsFilterComponent,
    IOutputFilterData,
} from '@widgets/products-filter';
import { ProductCardComponent } from '@features/product-card';
import { PaginationComponent } from '@features/pagination';
import { IProduct } from '@assets/products/types/product.interface';
import { ContactUsCardComponent } from '@features/contact-us-card';
import { TranslatePipe } from '@shared/lib';
import {
    selectCurrentChunkProducts,
    selectFilteredProducts,
    ProductsActions,
} from '@app/core';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [
        UrlSegmentsVisualizerComponent,
        CommonModule,
        ProductsFilterComponent,
        ProductCardComponent,
        PaginationComponent,
        ContactUsCardComponent,
        TranslatePipe,
        LetDirective,
        PushPipe,
    ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnDestroy {
    private readonly destroy$ = new Subject<void>();

    category = '';

    readonly filteredProducts$ = this.store
        .select(selectFilteredProducts)
        .pipe(debounceTime(600));
    readonly productsChunk$ = this.store.select(selectCurrentChunkProducts);

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly cdr: ChangeDetectorRef,
        private readonly store: Store,
    ) {
        this.activatedRoute.paramMap
            .pipe(takeUntil(this.destroy$))
            .subscribe((paramMap) => {
                const category = paramMap.get('category');

                category && (this.category = category);
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onGetFilterData(filterData: IOutputFilterData) {
        this.store.dispatch(
            ProductsActions.filterByOutputFilterData(filterData),
        );
    }

    getProductsChunk$(currentChunk: readonly IProduct[]) {
        this.store.dispatch(ProductsActions.setCurrentChunk({ currentChunk }));
        this.cdr.detectChanges();
    }
}
