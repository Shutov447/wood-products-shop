import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../shared/products/products.service';
import { UrlSegmentsVisualizerComponent } from '../../components/url-segments-visualizer/url-segments-visualizer.component';
import { ImageGalleryComponent } from '../../components/image-gallery/image-gallery.component';
import { ButtonModule } from '../../components/button/button.module';
import { CounterComponent } from '../../components/counter/counter.component';
import { ContactUsCardComponent } from '../../components/contact-us-card/contact-us-card-default/contact-us-card.component';
import { CharacteristicsComponent } from '../../components/characteristics/characteristics.component';

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
    ],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    product$ = this.productsService.product$;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly productsService: ProductsService,
    ) {
        this.activatedRoute.paramMap.subscribe((paramMap) => {
            const productName = paramMap.get('product');

            productName && this.productsService.getProductByName(productName);
        });
    }

    getProductNumber(productNumber: number) {
        // eslint-disable-next-line no-console
        console.log(productNumber);
    }
}
