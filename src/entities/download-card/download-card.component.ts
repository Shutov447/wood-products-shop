import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    afterNextRender,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ButtonModule, DownloadIconComponent } from '@shared/components';
import { getFileType, normalizeDataSize } from '@shared/utils';

@Component({
    selector: 'app-download-card',
    standalone: true,
    imports: [ButtonModule, DownloadIconComponent],
    templateUrl: './download-card.component.html',
    styleUrl: './download-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadCardComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();

    @Input({ required: true }) fileName = '';
    @Input({ required: true }) fileSrc = '';

    fileType = '';
    fileSize = '';

    constructor(
        private readonly http: HttpClient,
        private readonly cdr: ChangeDetectorRef,
    ) {
        afterNextRender(() => {
            this.calculateFileSize();
        });
    }

    ngOnInit() {
        this.fileType = getFileType(this.fileSrc);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private calculateFileSize() {
        this.http
            .get(this.fileSrc, {
                responseType: 'blob',
                observe: 'response',
                headers: new HttpHeaders().set(
                    'Accept',
                    `application/${this.fileType.toLowerCase()}`,
                ),
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => {
                this.readerOnload(event);
            });
    }

    private readerOnload(event: HttpResponse<Blob>) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileAsArrayBuffer = e.target?.result as ArrayBuffer;

            if (fileAsArrayBuffer.byteLength) {
                this.fileSize = normalizeDataSize(fileAsArrayBuffer.byteLength);
                this.cdr.markForCheck();
            }
        };

        reader.readAsArrayBuffer(event.body as Blob);
    }
}
