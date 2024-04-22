import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UrlSegmentsVisualizerComponent } from '../../components/url-segments-visualizer/url-segments-visualizer.component';
import { productsFeatureSelector } from '../../store/products/products.selector';
import { IState } from '../../store/reducer';
import { ProductsService } from '../../shared/products/products.service';
import { ICategotyIntroImg } from '../../../assets/category-intro-img/types/category-intro-img.interface';
import { ButtonModule } from '../../components/button/button.module';

@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [
        UrlSegmentsVisualizerComponent,
        CommonModule,
        RouterModule,
        ButtonModule,
    ],
    templateUrl: './catalog.component.html',
    styleUrl: './catalog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
    readonly categories$ = this.store$.pipe(
        select(productsFeatureSelector),
        map(({ categories }) => categories),
    );

    readonly introImg$ = this.http.get<ICategotyIntroImg>(
        'assets/category-intro-img/category-intro-img.json',
    );

    constructor(
        private readonly store$: Store<IState>,
        @Inject(ProductsService)
        private readonly productsService: ProductsService,
        private readonly http: HttpClient,
    ) {}
}
