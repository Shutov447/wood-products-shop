import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UrlSegmentsVisualizerComponent } from '@features/url-segments-visualizer';

@Component({
    selector: 'app-delivery',
    standalone: true,
    imports: [UrlSegmentsVisualizerComponent],
    templateUrl: './delivery.component.html',
    styleUrl: './delivery.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryComponent {}
