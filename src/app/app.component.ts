import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TuiScrollbarService } from './shared/for-tui-scrollbar/tui-scrollbar.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        NavbarComponent,
        FooterComponent,
        TuiScrollbarModule,
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
    ) {
        // this.http
        //     .get<IProduct[]>('assets/products/products-data.json')
        //     .pipe(take(1))
        //     .subscribe((products) => {
        //         this.store$.dispatch(addProducts(products));
        //     });
    }
}
