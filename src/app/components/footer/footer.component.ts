import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LetDirective, PushPipe } from '@ngrx/component';
import { LogoComponent } from '../logo/logo.component';
import { PHONE_NUMBER } from '../../shared/contact-info/phone-number.token';
import { SUPPORT_EMAIL } from '../../shared/contact-info/support-email.token';
import { ADDRESS } from '../../shared/contact-info/address.token';
import { METRO_STATION } from '../../shared/contact-info/metro-station.token';
import { ButtonModule } from '../button/button.module';
import { TELEGRAM } from '../../shared/contact-info/telegram.token';
import { VK } from '../../shared/contact-info/vk.token';
import { PINTEREST } from '../../shared/contact-info/pinterest.token';
import { TranslatePipe } from '../../shared/translations/pipe/translate.pipe';
import { selectCategories } from '../../store/products/products.selectors';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        LogoComponent,
        CommonModule,
        RouterModule,
        ButtonModule,
        TranslatePipe,
        LetDirective,
        PushPipe,
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
    readonly currentYear = new Date().getFullYear();
    readonly categories$ = this.store.select(selectCategories);

    constructor(
        private readonly store: Store,
        @Inject(SUPPORT_EMAIL) readonly suppurtEmail: string,
        @Inject(PHONE_NUMBER) readonly phoneNumber: string,
        @Inject(ADDRESS) readonly address: string,
        @Inject(METRO_STATION) readonly matroStation: string,
        @Inject(TELEGRAM) readonly tg: string,
        @Inject(VK) readonly vk: string,
        @Inject(PINTEREST) readonly pinterest: string,
    ) {}
}
