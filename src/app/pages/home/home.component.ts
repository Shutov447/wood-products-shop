import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiCarouselModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ButtonModule } from '../../components/button/button.module';
import { ISliderData } from '../../../assets/slider/types/slider-data.interface';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { IServiceCard } from '../../../assets/service-card/types/service-card.interface';
import { ContactUsCardComponent } from '../../components/contact-us-card/contact-us-card.component';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { IArticleCardData } from '../../../assets/article-card/types/article-card-data.interface';

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
export class HomeComponent {
    constructor(@Inject(HttpClient) private readonly http: HttpClient) {}

    readonly slidersData$ = this.http.get<ISliderData[]>(
        'assets/slider/slider-data.json',
    );
    readonly serviceCardsData$ = this.http.get<IServiceCard[]>(
        'assets/service-card/service-card-data.json',
    );
    readonly articlesCardsData$ = this.http
        .get<IArticleCardData[]>('assets/article-card/article-card-data.json')
        .pipe(map((articlesCardsData) => articlesCardsData.slice(0, 6)));
}
