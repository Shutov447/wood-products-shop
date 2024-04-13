import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { chunk, concat } from 'lodash';
import { UrlSegmentsVisualizerComponent } from '../../components/url-segments-visualizer/url-segments-visualizer.component';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { IState } from '../../store/reducer';
import { articlesFeatureSelector } from '../../store/articles/articles.selector';
import { IArticleCardData } from '../../../assets/article-card/types/article-card-data.interface';

@Component({
    selector: 'app-articles',
    standalone: true,
    imports: [
        UrlSegmentsVisualizerComponent,
        ArticleCardComponent,
        CommonModule,
    ],
    templateUrl: './articles.component.html',
    styleUrl: './articles.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent {
    articlesCardsChunksToSee: IArticleCardData[] = [];
    isShowButton = true;

    private articlesCardsChunks: IArticleCardData[][] = [];
    private articlesChunkNumber = 0;

    constructor(private readonly store$: Store<IState>) {
        this.store$
            .pipe(select(articlesFeatureSelector))
            .subscribe((articlesCardsData) => {
                this.articlesCardsChunks = chunk(articlesCardsData.data, 9);
                this.articlesCardsChunksToSee =
                    this.articlesCardsChunks[this.articlesChunkNumber];
            });
    }

    onButtonClick() {
        this.addArticlesChunk();
        this.setButtonShow();
    }

    private addArticlesChunk() {
        this.articlesChunkNumber++;
        this.articlesCardsChunksToSee = concat(
            this.articlesCardsChunksToSee,
            this.articlesCardsChunks[this.articlesChunkNumber],
        );
    }

    private setButtonShow() {
        this.isShowButton = !(
            this.articlesChunkNumber ===
            this.articlesCardsChunks.length - 1
        );
    }
}
