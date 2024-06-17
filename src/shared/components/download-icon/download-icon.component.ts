import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-download-icon',
    standalone: true,
    imports: [],
    templateUrl: './download-icon.component.html',
    styleUrl: './download-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadIconComponent {}
