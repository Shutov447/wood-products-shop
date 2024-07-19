import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    NgZone,
    OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';
import { NavbarComponent } from '@widgets/navbar';
import { FooterComponent } from '@widgets/footer';
import { TuiScrollbarService, ProductsApiActions } from '@shared/model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        NavbarComponent,
        FooterComponent,
        TuiScrollbarModule,
        PushPipe,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    title = 'wood-products-shop';

    readonly tuiScrollbarHidden$ = this.tuiScrollbarService.hidden$;

    constructor(
        private readonly ngZone: NgZone,
        @Inject(TuiScrollbarService)
        private readonly tuiScrollbarService: TuiScrollbarService,
        private readonly store: Store,
    ) {
        this.store.dispatch(ProductsApiActions.loadProducts());
    }

    ngOnInit() {
        if (window.Cypress) {
            window.ngZone = this.ngZone;
            window.store = this.store;
        }
    }
}
