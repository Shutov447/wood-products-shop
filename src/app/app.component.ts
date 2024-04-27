import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
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
export class AppComponent {
    title = 'wood-products-shop';

    constructor(
        @Inject(HttpClient) private readonly http: HttpClient,
        private readonly store$: Store<IState>,
    ) {
        this.http
            .get<IProduct[]>('assets/products/products-data.json')
            .pipe(take(1))
            .subscribe((products) => {
                this.store$.dispatch(addProducts(products));
            });
        this.http
            .get<IArticleCardData[]>(
                'assets/article-card/article-card-data.json',
            )
            .pipe(take(1))
            .subscribe((articlesCardsData) => {
                this.store$.dispatch(addArticles(articlesCardsData));
            });
    }
}
