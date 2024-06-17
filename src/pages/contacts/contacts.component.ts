import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { UrlSegmentsVisualizerComponent } from '@features/url-segments-visualizer';
import {
    ADDRESS,
    METRO_STATION,
    STORE_HOURS,
    PHONE_NUMBER,
    SUPPORT_EMAIL,
    PINTEREST,
    TELEGRAM,
    VK,
} from '@shared/api';
import { ButtonModule } from '@shared/components';
import { ContactUsCardLessComponent } from '@features/contact-us-card';

@Component({
    selector: 'app-contacts',
    standalone: true,
    imports: [
        UrlSegmentsVisualizerComponent,
        ButtonModule,
        ContactUsCardLessComponent,
    ],
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
    readonly kilamanjaro = '#3b3937';
    readonly hintOfRed = '#f3f0ee';

    constructor(
        @Inject(SUPPORT_EMAIL) readonly suppurtEmail: string,
        @Inject(PHONE_NUMBER) readonly phoneNumber: string,
        @Inject(ADDRESS) readonly address: string,
        @Inject(METRO_STATION) readonly metroStation: string,
        @Inject(STORE_HOURS) readonly storeHours: string,
        @Inject(TELEGRAM) readonly tg: string,
        @Inject(VK) readonly vk: string,
        @Inject(PINTEREST) readonly pinterest: string,
    ) {}
}
