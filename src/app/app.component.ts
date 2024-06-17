import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';
import { NavbarComponent } from '@widgets/navbar';
import { FooterComponent } from '@widgets/footer';
import { TuiScrollbarService } from '@shared/model';
import { ProductsApiActions } from '@app/core';

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
})
export class AppComponent {
    title = 'wood-products-shop';

    readonly tuiScrollbarHidden$ = this.tuiScrollbarService.hidden$;

    constructor(
        @Inject(TuiScrollbarService)
        private readonly tuiScrollbarService: TuiScrollbarService,
        private readonly store: Store,
    ) {
        this.store.dispatch(ProductsApiActions.loadProducts());
    }
}
