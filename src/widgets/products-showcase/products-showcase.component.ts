import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { ProductCardComponent } from '@features/product-card';
import { IProduct } from '@shared/api';
import { TranslatePipe } from '@shared/lib';
import {
    ProductsActions,
    selectCategories,
    selectFilteredProducts,
} from '@shared/model';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-products-showcase',
    standalone: true,
    imports: [
        ProductCardComponent,
        CommonModule,
        RouterModule,
        TranslatePipe,
        LetDirective,
        PushPipe,
    ],
    templateUrl: './products-showcase.component.html',
    styleUrl: './products-showcase.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsShowcaseComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();

    @Input() selectedCategory = 'sad';

    readonly filteredProducts$ = this.store.select(selectFilteredProducts);
    readonly categories$ = this.store.select(selectCategories);

    constructor(private readonly store: Store) {}

    ngOnInit() {
        this.filterProducts(this.selectedCategory); // не работает как надо при инициализации, оставил для тестов
        // FIXME: initFiltration это временное решение для инициализационной фильтрации
        // FIXME: проблем в том, что при инициализаии единаждый вызванного метода filterProducts
        // FIXME: filteredProducts все еще пустой, я пока не могу понять причину
        this.initFiltration();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    filterProducts(category: IProduct['category']) {
        this.selectedCategory = category;
        this.store.dispatch(
            ProductsActions.filterByCategoryAndAmount({
                category,
                amount: 9,
            }),
        );
    }

    initFiltration() {
        let intervalId = 0;

        this.filteredProducts$
            .pipe(takeUntil(this.destroy$))
            .subscribe((filteredProducts) => {
                window.clearInterval(intervalId); // setInterval тут нужен чтобы не забивать очередь задач, а то store не будет обновляться

                if (filteredProducts.length === 0) {
                    intervalId = window.setInterval(() => {
                        this.filterProducts(this.selectedCategory);
                    }, 100);
                }
            });
    }
}
