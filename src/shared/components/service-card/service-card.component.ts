import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IServiceCard } from '@shared/api';
import { ButtonModule } from '../button';

@Component({
    selector: 'app-service-card',
    standalone: true,
    imports: [ButtonModule],
    templateUrl: './service-card.component.html',
    styleUrl: './service-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
    @Input({ required: true }) image: IServiceCard['image'] | null = null;
    @Input({ required: true }) header: IServiceCard['header'] | null = null;
    @Input({ required: true }) content: IServiceCard['content'] | null = null;
    @Input({ required: true }) buttonText: IServiceCard['button_text'] | null =
        null;
}
