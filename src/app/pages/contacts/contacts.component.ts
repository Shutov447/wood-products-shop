import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { UrlSegmentsVisualizerComponent } from '../../components/url-segments-visualizer/url-segments-visualizer.component';
import { ADDRESS } from '../../shared/contact-info/address.token';
import { METRO_STATION } from '../../shared/contact-info/metro-station.token';
import { STORE_HOURS } from '../../shared/contact-info/store-hours.token';
import { PHONE_NUMBER } from '../../shared/contact-info/phone-number.token';
import { SUPPORT_EMAIL } from '../../shared/contact-info/support-email.token';
import { ButtonModule } from '../../components/button/button.module';
import { PINTEREST } from '../../shared/contact-info/pinterest.token';
import { TELEGRAM } from '../../shared/contact-info/telegram.token';
import { VK } from '../../shared/contact-info/vk.token';
import { ContactUsCardLessComponent } from '../../components/contact-us-card/contact-us-card-less/contact-us-card-less.component';

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
