import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'app-url-segments-visualizer',
    standalone: true,
    imports: [CommonModule, RouterModule],
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
