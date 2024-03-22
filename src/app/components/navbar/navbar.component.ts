import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { SUPPORT_EMAIL } from '../../shared/contact-info/support-email.token';
import { PHONE_NUMBER } from '../../shared/contact-info/phone-number.token';
import { ButtonModule } from '../button/button.module';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [LogoComponent, ButtonModule, RouterModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
    constructor(
        @Inject(SUPPORT_EMAIL) readonly suppurtEmail: string,
        @Inject(PHONE_NUMBER) readonly phoneNumber: string,
    ) {}
}
