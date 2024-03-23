import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from '../button/button.module';

@Component({
    selector: 'app-contact-us-card',
    standalone: true,
    imports: [ButtonModule],
    templateUrl: './contact-us-card.component.html',
    styleUrl: './contact-us-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsCardComponent {}
