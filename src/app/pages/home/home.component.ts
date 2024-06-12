import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiCarouselModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { ButtonModule } from '../../components/button/button.module';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { ContactUsCardComponent } from '../../components/contact-us-card/contact-us-card-default/contact-us-card.component';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { ProductsShowcaseComponent } from '../../components/products-showcase/products-showcase.component';
import {} from '../../shared/articles-card/articles-card.service';
import { selectArticlesCardsChunks } from '../../store/articles/articles.selectors';
import { HomeActions } from './store/home.actions';
import { selectSliders } from '../../store/sliders/sliders.selectors';
import { selectServices } from '../../store/services/services.selectors';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        TuiCarouselModule,
        ButtonModule,
        CommonModule,
        ServiceCardComponent,
        ContactUsCardComponent,
        ArticleCardComponent,
        ProductsShowcaseComponent,
        RouterModule,
        LetDirective,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    readonly articlesCardsChunks$ = this.store.select(
        selectArticlesCardsChunks,
    );
    readonly sliders$ = this.store.select(selectSliders);
    readonly services$ = this.store.select(selectServices);

    constructor(private readonly store: Store) {
        this.store.dispatch(
            HomeActions.pageWithHomeComponentOpened({ chunkSize: 6 }),
        );
    }
}
