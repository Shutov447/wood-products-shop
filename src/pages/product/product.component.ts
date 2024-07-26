import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { UrlSegmentsVisualizerComponent } from '@features/url-segments-visualizer';
import { ImageGalleryComponent } from '@features/image-gallery';
import {
    ButtonModule,
    CounterComponent,
    DialogComponent,
    AlertTriangleIconComponent,
} from '@shared/components';
import { ContactUsCardComponent } from '@features/contact-us-card';
import { CharacteristicsComponent } from '@entities/characteristics';
import { selectCurrentProduct } from '@shared/model';
import { Subject } from 'rxjs';

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
export class ProductComponent
    extends ContactUsCardComponent
    implements OnDestroy
{
    private readonly destroy$ = new Subject<void>();
    readonly product$ = this.store.select(selectCurrentProduct);

    productsCount = 1;
    isOrderFormPopup = true;

    constructor(
        private readonly fb: FormBuilder,
        private readonly store: Store,
    ) {
        super(fb);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
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
