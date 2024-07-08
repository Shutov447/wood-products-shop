import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { ProductCardComponent } from '@features/product-card';
import { IProduct } from '@shared/api';
import { TranslatePipe } from '@shared/lib';
import { selectProducts, ProductsActions } from '@shared/model';

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
export class ProductsShowcaseComponent implements OnInit {
    @Input() selectedCategory = 'sad';

    readonly products$ = this.store.select(selectProducts);

    constructor(private readonly store: Store) {}

    ngOnInit() {
        this.filterProducts(this.selectedCategory);
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
}
