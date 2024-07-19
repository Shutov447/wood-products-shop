import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { chunk } from 'lodash';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent<T> implements OnChanges {
    @Input({ required: true }) chunkSize: number | null = null;
    @Input({ required: true }) paginationItems: readonly T[] | null = null;

    @Output() readonly getCurrentChunk = new EventEmitter<readonly T[]>();

    selectedChunkNumber = 0;
    chunks: readonly T[][] | null = null;

    ngOnChanges({ paginationItems }: SimpleChanges) {
        if (paginationItems && this.chunkSize) {
            this.chunks = chunk(this.paginationItems, this.chunkSize);
            this.selectChunk(0);
        }
    }

    selectChunk(chunkNumber: number) {
        this.selectedChunkNumber = chunkNumber;
        this.getCurrentChunk.emit(this.chunks?.[chunkNumber]);
    }
}
