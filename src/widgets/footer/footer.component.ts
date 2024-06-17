import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LetDirective, PushPipe } from '@ngrx/component';
import { LogoComponent, ButtonModule } from '@shared/components';
import {
    PHONE_NUMBER,
    SUPPORT_EMAIL,
    ADDRESS,
    TELEGRAM,
    VK,
    PINTEREST,
    METRO_STATION,
} from '@shared/api';
import { selectCategories } from '@app/core';
import { TranslatePipe } from '@shared/lib';

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
