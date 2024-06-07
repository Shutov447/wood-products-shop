import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductsService } from '../../shared/products/products.service';
import { IProduct } from '../../../assets/products/types/product.interface';
import {
    ICategoryAndAmount,
    filterByCategoryAndAmount,
} from '../../shared/products/shared/filter-functions/by-category-and-amount';
import { TranslatePipe } from '../../shared/translations/pipe/translate.pipe';
import { selectProducts } from '../../store/products/products.selectors';

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
export class ProductsShowcaseComponent {
    readonly productsThatNeedRemove$ = this.productsService.products$;

    @Input() selectedCategory = 'sad';

    readonly products$ = this.store.select(selectProducts);

    constructor(
        private readonly store: Store,
        @Inject(ProductsService)
        private readonly productsService: ProductsService,
    ) {
        this.filter(this.selectedCategory);
    }

    filter(category: IProduct['category']) {
        this.selectedCategory = category;
        this.productsService.filterProducts$<ICategoryAndAmount>(
            { category: category, amount: 9 },
            filterByCategoryAndAmount,
        );
    }
}
