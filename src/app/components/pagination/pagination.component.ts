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
    @Input({ required: true }) chunkSize = 0;
    @Input({ required: true }) paginationItems: T[] | null = null;

    @Output() getCurrentChunk = new EventEmitter<T[]>();

    selectedChunkNumber = 0;
    chunks: T[][] | null = null;

    ngOnChanges({ paginationItems }: SimpleChanges) {
        if (paginationItems) {
            this.chunks = chunk(this.paginationItems, this.chunkSize);
            this.selectChunk(0);
        }
    }

    selectChunk(chunkNumber: number) {
        this.selectedChunkNumber = chunkNumber;
        this.getCurrentChunk.emit(this.chunks?.[chunkNumber]);
    }
}
