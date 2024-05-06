import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { chunk } from 'lodash';
import { IProduct } from '../../../assets/products/types/product.interface';

@Component({
    selector: 'app-image-gallery',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './image-gallery.component.html',
    styleUrl: './image-gallery.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGalleryComponent implements OnInit {
    @Input({ required: true }) images: IProduct['photos'] | null | undefined;
    @Input({ required: true }) alt: string | null | undefined = 'image';
    @Input() chunkSize = 5;

    chunks: string[][] | null = null;
    currentChunkNumber = 0;
    currentImgNumber = 0;

    ngOnInit() {
        this.chunks = chunk(this.images, this.chunkSize);
    }

    setCurrentImg(currentImgNumber: number) {
        this.currentImgNumber = currentImgNumber;
    }

    seeNextImg() {
        const isLastImgOfLastChunk =
            this.currentChunkNumber === Number(this.chunks?.length) - 1 &&
            this.currentImgNumber ===
                Number(this.chunks?.[this.currentChunkNumber]?.length) - 1;

        if (isLastImgOfLastChunk) {
            this.currentChunkNumber = 0;
            this.currentImgNumber = 0;

            return;
        }

        const isLastImg = this.currentImgNumber === this.chunkSize - 1;

        if (isLastImg) {
            this.currentChunkNumber++;
            this.currentImgNumber = 0;

            return;
        }

        this.currentImgNumber++;
    }

    seePreviosImg() {
        const isFirstImgOfFirstChunk =
            this.currentImgNumber === 0 && this.currentChunkNumber === 0;

        if (isFirstImgOfFirstChunk) {
            this.currentChunkNumber = Number(this.chunks?.length) - 1;
            this.currentImgNumber =
                Number(this.chunks?.[this.currentChunkNumber]?.length) - 1;

            return;
        }

        const isFirstImg = this.currentImgNumber === 0;

        if (isFirstImg) {
            this.currentImgNumber = this.chunkSize - 1;
            this.currentChunkNumber--;

            return;
        }

        this.currentImgNumber--;
    }
}
