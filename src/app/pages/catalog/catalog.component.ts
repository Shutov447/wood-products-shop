import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { UrlSegmentsVisualizerComponent } from '../../components/url-segments-visualizer/url-segments-visualizer.component';
import { ButtonModule } from '../../components/button/button.module';
import { TranslatePipe } from '../../shared/translations/pipe/translate.pipe';
import { selectCategoriesData } from './store/catalog.selectors';
import { CatalogApiActions } from './store/catalog.actions';

@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [
        UrlSegmentsVisualizerComponent,
        CommonModule,
        RouterModule,
        ButtonModule,
        TranslatePipe,
        LetDirective,
        PushPipe,
    ],
    templateUrl: './catalog.component.html',
    styleUrl: './catalog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
    readonly categoriesData$ = this.store.select(selectCategoriesData);

    constructor(private readonly store: Store) {
        this.store.dispatch(CatalogApiActions.loadCategryIntroImg());
    }
}
