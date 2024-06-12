import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IQuoteCard } from '../../../assets/quote-card/types/quote-card.type';

@Component({
    selector: 'app-quote-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './quote-card.component.html',
    styleUrl: './quote-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteCardComponent {
    @Input({ required: true }) quoteData: IQuoteCard | null | undefined;
}
