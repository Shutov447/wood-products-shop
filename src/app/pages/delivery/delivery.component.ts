import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-delivery',
    standalone: true,
    imports: [],
    templateUrl: './delivery.component.html',
    styleUrl: './delivery.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryComponent {}
