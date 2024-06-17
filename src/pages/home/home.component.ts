import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiCarouselModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { ButtonModule, ServiceCardComponent } from '@shared/components';
import { ContactUsCardComponent } from '@features/contact-us-card';
import { ArticleCardComponent } from '@entities/article-card';
import { ProductsShowcaseComponent } from '@widgets/products-showcase';
import {
    selectArticlesCardsChunks,
    selectSliders,
    selectServices,
} from '@app/core';
import { HomeActions } from './model/home.actions';

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
