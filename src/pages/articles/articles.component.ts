import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { UrlSegmentsVisualizerComponent } from '@features/url-segments-visualizer';
import { ArticleCardComponent } from '@entities/article-card';
import {
    selectArticles,
    ArticlesCardsActions,
    ArticlesCardsApiActions,
} from '@shared/model';

@Component({
    selector: 'app-articles',
    standalone: true,
    imports: [
        UrlSegmentsVisualizerComponent,
        ArticleCardComponent,
        CommonModule,
        LetDirective,
    ],
    templateUrl: './articles.component.html',
    styleUrl: './articles.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent {
    private chunkNumber = 1;

    readonly articles$ = this.store.select(selectArticles);

    constructor(private readonly store: Store) {
        this.store.dispatch(
            ArticlesCardsApiActions.loadArticlesCardsChunks({ chunkSize: 9 }),
        );
    }

    onButtonClick() {
        this.store.dispatch(
            ArticlesCardsActions.addChunkToAccumulating({
                chunkNumber: this.chunkNumber++,
            }),
        );
    }
}
