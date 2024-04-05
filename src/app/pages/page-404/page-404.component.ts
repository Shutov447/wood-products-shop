import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-page-404',
    standalone: true,
    imports: [],
    templateUrl: './page-404.component.html',
    styleUrl: './page-404.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page404Component {}
