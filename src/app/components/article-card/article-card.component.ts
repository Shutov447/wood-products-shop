import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '../button/button.module';
import { IDate } from './shared/types/date.interface';

@Component({
    selector: 'app-article-card',
    standalone: true,
    imports: [ButtonModule, CommonModule, RouterModule],
    templateUrl: './article-card.component.html',
    styleUrl: './article-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCardComponent {
    @Input({ required: true }) img = '';
    @Input({ required: true }) header = '';
    @Input({ required: true }) content = '';
    @Input({ required: true }) date: IDate | null = null;
}
