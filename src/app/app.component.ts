import { Component, Inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { IProduct } from '../assets/products/types/product.interface';
import { addProducts } from './store/products/products.actions';
import { IState } from './store/reducer';
import { IArticleCardData } from '../assets/article-card/types/article-card-data.interface';
import { addArticles } from './store/articles/articles.actions';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        NavbarComponent,
        FooterComponent,
        TuiScrollbarModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
    private readonly destroy$ = new Subject<void>();

    title = 'wood-products-shop';

    constructor(
        @Inject(HttpClient) private readonly http: HttpClient,
        private readonly store$: Store<IState>,
    ) {
        this.http
            .get<IProduct[]>('assets/products/products-data.json')
            .pipe(takeUntil(this.destroy$))
            .subscribe((products) => {
                this.store$.dispatch(addProducts(products));
            });
        this.http
            .get<IArticleCardData[]>(
                'assets/article-card/article-card-data.json',
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe((articlesCardsData) => {
                this.store$.dispatch(addArticles(articlesCardsData));
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
