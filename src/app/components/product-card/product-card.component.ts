import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewChild,
} from '@angular/core';
import { TuiCarouselComponent, TuiCarouselModule } from '@taiga-ui/kit';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '../button/button.module';
import { IProduct } from '../../../assets/products/types/product.interface';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [TuiCarouselModule, ButtonModule, CommonModule, RouterModule],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
    @Input({ required: true }) name: IProduct['name'] | null = null;
    @Input({ required: true }) price: IProduct['price'] | null = null;
    @Input({ required: true }) imgs: IProduct['photos'] | null = null;

    @ViewChild('carousel', {
        static: true,
        read: TuiCarouselComponent,
    })
    private readonly carousel: TuiCarouselComponent | null = null;

    currentDot = 0;

    seeNextImg() {
        this.carousel?.onAutoscroll();
        const imgCount = (this.carousel?.items.length as number) - 1;

        if (imgCount === this.currentDot) {
            this.currentDot = 0;

            return;
        }

        this.currentDot++;
    }
}
