import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, debounceTime, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UrlSegmentsVisualizerComponent } from '../../components/url-segments-visualizer/url-segments-visualizer.component';
import { ProductsFilterComponent } from '../../components/products-filter/products-filter.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../shared/products/products.service';
import { IOutputFilterData } from '../../components/products-filter/shared/types/output-filter-data.interface';
import { filterByOutputFilterData } from '../../shared/products/shared/filter-functions/by-output-filter-data';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { IProduct } from '../../../assets/products/types/product.interface';
import { ContactUsCardComponent } from '../../components/contact-us-card/contact-us-card-default/contact-us-card.component';

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
    ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
    readonly currentCategory$ = this.activatedRoute.paramMap.pipe(
        switchMap((paramMap) => of(paramMap.get('category'))),
    );

    readonly products$ = this.productsService.products$.pipe(debounceTime(600));

    private readonly _productsChunk$ = new BehaviorSubject<IProduct[] | null>(
        null,
    );
    readonly productsChunk$ = this._productsChunk$.asObservable();

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        @Inject(ProductsService)
        private readonly productsService: ProductsService,
        private readonly cdr: ChangeDetectorRef,
    ) {}

    onGetFilterData(filterData: IOutputFilterData) {
        this.productsService.filterProducts$<IOutputFilterData>(
            filterData,
            filterByOutputFilterData,
        );
    }

    getProductsChunk$(productsChunk: IProduct[]) {
        this._productsChunk$.next(productsChunk);
        this.cdr.detectChanges();
    }
}
