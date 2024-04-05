import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { PHONE_NUMBER } from '../../shared/contact-info/phone-number.token';
import { SUPPORT_EMAIL } from '../../shared/contact-info/support-email.token';
import { ADDRESS } from '../../shared/contact-info/address.token';
import { METRO_STATION } from '../../shared/contact-info/metro-station.token';
import { ButtonModule } from '../button/button.module';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [LogoComponent, CommonModule, RouterModule, ButtonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
    readonly currentYear = new Date().getFullYear();

    constructor(
        @Inject(SUPPORT_EMAIL) readonly suppurtEmail: string,
        @Inject(PHONE_NUMBER) readonly phoneNumber: string,
        @Inject(ADDRESS) readonly address: string,
        @Inject(METRO_STATION) readonly matroStation: string,
    ) {}
}
