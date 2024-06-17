import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoComponent, ButtonModule } from '@shared/components';
import { SUPPORT_EMAIL, PHONE_NUMBER } from '@shared/api';

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
