import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonModule } from '../button/button.module';
import { IServiceCard } from '../../../assets/service-card/types/service-card.interface';

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
