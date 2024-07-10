import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TuiCarouselModule } from '@taiga-ui/kit';
import { PushPipe } from '@ngrx/component';
import { DownloadCardComponent } from '@entities/download-card';
import { QuoteCardComponent, ButtonModule } from '@shared/components';
import { IQuoteCard } from '@shared/lib';
import { UrlSegmentsVisualizerComponent } from '@features/url-segments-visualizer';

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
        this.currentDot < this.imgs.length - 1 && (this.currentDot += 1);
    }

    decrementCurrentDot() {
        this.currentDot > 0 && (this.currentDot -= 1);
    }
}
