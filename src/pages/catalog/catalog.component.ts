import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { UrlSegmentsVisualizerComponent } from '@features/url-segments-visualizer';
import { ButtonModule } from '@shared/components';
import { TranslatePipe } from '@shared/lib';
import { selectCategoriesData } from './model/catalog.selectors';
import { CatalogApiActions } from './model/catalog.actions';

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
