import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { PushPipe } from '@ngrx/component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TuiScrollbarService } from './shared/for-tui-scrollbar/tui-scrollbar.service';
import { ProductsApiActions } from './store/products/products.actions';

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
