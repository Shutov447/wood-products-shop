import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiCarouselModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '../../components/button/button.module';
import { ISliderData } from '../../../assets/slider/types/slider-data.interface';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { IServiceCard } from '../../../assets/service-card/types/service-card.interface';
import { ContactUsCardComponent } from '../../components/contact-us-card/contact-us-card-default/contact-us-card.component';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { IState } from '../../store/reducer';
import { articlesFeatureSelector } from '../../store/articles/articles.selector';
import { ProductsShowcaseComponent } from '../../components/products-showcase/products-showcase.component';

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
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    readonly slidersData$ = this.http.get<ISliderData[]>(
        'assets/slider/slider-data.json',
    );
    readonly serviceCardsData$ = this.http.get<IServiceCard[]>(
        'assets/service-card/service-card-data.json',
    );

    readonly articlesCards$ = this.store$.pipe(
        select(articlesFeatureSelector),
        map((articlesCardsData) => articlesCardsData.data.slice(0, 6)),
    );

    constructor(
        @Inject(HttpClient) private readonly http: HttpClient,
        private readonly store$: Store<IState>,
    ) {}
}
