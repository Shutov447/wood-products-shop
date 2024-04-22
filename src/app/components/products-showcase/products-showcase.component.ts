import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Input,
    OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { productsFeatureSelector } from '../../store/products/products.selector';
import { IState } from '../../store/reducer';
import { ProductsService } from '../../shared/products/products.service';
import { IProduct } from '../../../assets/products/types/product.interface';
import {
    ICategoryAndAmount,
    filterByCategoryAndAmount,
} from '../../shared/products/shared/filter-functions/by-category-and-amount';

@Component({
    selector: 'app-products-showcase',
    standalone: true,
    imports: [ProductCardComponent, CommonModule, RouterModule],
    templateUrl: './products-showcase.component.html',
    styleUrl: './products-showcase.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsShowcaseComponent implements OnInit {
    products: IProduct[] = [];

    @Input() selectedCategory = 'sad';

    readonly categories$ = this.store$.pipe(
        select(productsFeatureSelector),
        map(({ categories }) => categories),
    );

    constructor(
        private readonly store$: Store<IState>,
        @Inject(ProductsService)
        private readonly productsService: ProductsService,
    ) {}

    ngOnInit() {
        this.filter(this.selectedCategory);
    }

    filter(category: IProduct['category']) {
        this.selectedCategory = category;
        this.products = this.productsService.getProducts<ICategoryAndAmount>(
            { category: category, amount: 9 },
            filterByCategoryAndAmount,
        );
    }
}
