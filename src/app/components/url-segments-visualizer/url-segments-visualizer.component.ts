import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslatePipe } from '../../shared/translations/pipe/translate.pipe';

@Component({
    selector: 'app-url-segments-visualizer',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslatePipe],
    templateUrl: './url-segments-visualizer.component.html',
    styleUrl: './url-segments-visualizer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UrlSegmentsVisualizerComponent {
    urlSegmentTranslation: unknown;

    constructor(private readonly actRoute: ActivatedRoute) {}

    get segments$() {
        return this.actRoute.url;
    }
}
