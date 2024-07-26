import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewChild,
} from '@angular/core';
import { TuiCarouselComponent, TuiCarouselModule } from '@taiga-ui/kit';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@shared/components';
import { IProduct } from '@shared/api';
import { Store } from '@ngrx/store';
import { ProductsActions } from '@shared/model';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [TuiCarouselModule, ButtonModule, CommonModule, RouterModule],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
    @ViewChild('carousel', {
        static: true,
        read: TuiCarouselComponent,
    })
    private readonly carousel: TuiCarouselComponent | null = null;

    @Input({ required: true }) name: IProduct['name'] | null = null;
    @Input({ required: true }) price: IProduct['price'] | null = null;
    @Input({ required: true }) imgs: IProduct['photos'] | null = null;
    @Input({ required: true }) category: IProduct['category'] | null = null;

    currentDot = 0;

    constructor(private readonly store: Store) {}

    setCurrentProduct() {
        this.name &&
            this.store.dispatch(
                ProductsActions.setCurrentProductByName({
                    productName: this.name,
                }),
            );
    }

    seeNextImg() {
        this.carousel?.onAutoscroll();

        const imgCount = (this.carousel?.items.length as number) - 1;

        if (imgCount === this.currentDot) {
            this.currentDot = 0;

            return;
        }

        this.currentDot += 1;
    }
}
