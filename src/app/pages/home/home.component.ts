import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnDestroy,
} from '@angular/core';
import { TuiCarouselModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subject, map, takeUntil } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ButtonModule } from '../../components/button/button.module';
import { ISliderData } from '../../../assets/slider/types/slider-data.interface';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { IServiceCard } from '../../../assets/service-card/types/service-card.interface';
import { ContactUsCardComponent } from '../../components/contact-us-card/contact-us-card.component';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { IArticleCardData } from '../../../assets/article-card/types/article-card-data.interface';
import { IState } from '../../store/reducer';
import { addArticles } from '../../store/articles/articles.actions';
import { artilcesFeatureSelector } from '../../store/articles/articles.selector';

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
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy {
    private readonly destroy$ = new Subject<void>();

    readonly slidersData$ = this.http.get<ISliderData[]>(
        'assets/slider/slider-data.json',
    );
    readonly serviceCardsData$ = this.http.get<IServiceCard[]>(
        'assets/service-card/service-card-data.json',
    );

    readonly articlesCardsData$ = this.http
        .get<IArticleCardData[]>('assets/article-card/article-card-data.json')
        .pipe(takeUntil(this.destroy$))
        .subscribe((articlesCardsData) => {
            this.store$.dispatch(addArticles(articlesCardsData));
        });

    readonly artilcesCards$ = this.store$.pipe(
        select(artilcesFeatureSelector),
        map((articlesCardsData) => articlesCardsData.data.slice(0, 6)),
    );

    constructor(
        @Inject(HttpClient) private readonly http: HttpClient,
        private readonly store$: Store<IState>,
    ) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
