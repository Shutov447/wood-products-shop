import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { UrlSegmentsVisualizerComponent } from '../../components/url-segments-visualizer/url-segments-visualizer.component';
import { ImageGalleryComponent } from '../../components/image-gallery/image-gallery.component';
import { ButtonModule } from '../../components/button/button.module';
import { CounterComponent } from '../../components/counter/counter.component';
import { ContactUsCardComponent } from '../../components/contact-us-card/contact-us-card-default/contact-us-card.component';
import { CharacteristicsComponent } from '../../components/characteristics/characteristics.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { AlertTriangleIconComponent } from '../../components/alert-triangle-icon/alert-triangle-icon.component';
import { selectCurrentProduct } from '../../store/products/products.selectors';
import { ProductsActions } from '../../store/products/products.actions';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [
        CommonModule,
        UrlSegmentsVisualizerComponent,
        ImageGalleryComponent,
        ButtonModule,
        CounterComponent,
        ContactUsCardComponent,
        CharacteristicsComponent,
        DialogComponent,
        ReactiveFormsModule,
        AlertTriangleIconComponent,
        RouterModule,
        LetDirective,
    ],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent extends ContactUsCardComponent {
    readonly product$ = this.store.select(selectCurrentProduct);

    productsCount = 1;
    isOrderFormPopup = true;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly fb: FormBuilder,
        private readonly store: Store,
    ) {
        super(fb);
        this.activatedRoute.paramMap.subscribe((paramMap) => {
            const productName = paramMap.get('product');

            productName &&
                this.store.dispatch(
                    ProductsActions.setCurrentProductByName({ productName }),
                );
        });
    }

    setProductNumber(productNumber: number) {
        this.productsCount = productNumber;
    }

    getPopupHiddenState(hiddenState: boolean) {
        if (!this.isOrderFormPopup && hiddenState) {
            this.isOrderFormPopup = false;
        } else {
            this.isOrderFormPopup = true;
        }
    }
}
