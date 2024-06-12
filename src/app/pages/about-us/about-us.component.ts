import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TuiCarouselModule } from '@taiga-ui/kit';
import { PushPipe } from '@ngrx/component';
import { DownloadCardComponent } from '../../components/download-card/download-card.component';
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';
import { IQuoteCard } from '../../../assets/quote-card/types/quote-card.type';
import { UrlSegmentsVisualizerComponent } from '../../components/url-segments-visualizer/url-segments-visualizer.component';
import { ButtonModule } from '../../components/button/button.module';

@Component({
    selector: 'app-about-us',
    standalone: true,
    imports: [
        CommonModule,
        DownloadCardComponent,
        QuoteCardComponent,
        UrlSegmentsVisualizerComponent,
        TuiCarouselModule,
        ButtonModule,
        PushPipe,
    ],
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent {
    readonly quoteData$ = this.http.get<IQuoteCard>(
        'assets/quote-card/quote-card-data.json',
    );
    readonly imgs = [
        'assets/img/about-us/Rectangle1.jpeg',
        'assets/img/about-us/Rectangle2.jpeg',
        'assets/img/about-us/Rectangle3.jpeg',
    ];

    currentDot = 0;

    constructor(private readonly http: HttpClient) {}

    incrementCurrentDot() {
        this.currentDot < this.imgs.length - 1 && this.currentDot++;
    }

    decrementCurrentDot() {
        this.currentDot > 0 && this.currentDot--;
    }
}
