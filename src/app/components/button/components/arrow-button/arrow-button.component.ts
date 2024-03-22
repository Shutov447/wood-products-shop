import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Input,
} from '@angular/core';
import { TuiSvgService } from '@taiga-ui/core';
import { tuiIconArrowLeftLarge, tuiIconArrowRightLarge } from '@taiga-ui/icons';
import { ArrowDirection } from '../../shared/types/arrow-direction.type';
import { ElemHoverService } from '../../shared/services/elem-hover.service';

@Component({
    selector: 'app-arrow-button',
    templateUrl: './arrow-button.component.html',
    styleUrl: './arrow-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ElemHoverService],
})
export class ArrowButtonComponent {
    @Input({ required: true }) arrowDirection: ArrowDirection | null = null;

    readonly white = '#ffffff';
    readonly frangipani = '#ffd6a8';
    readonly isHovered$ = this.elemHoverService.isHovered$;

    constructor(
        private readonly elemHoverService: ElemHoverService,
        @Inject(TuiSvgService) private readonly tuiSvgService: TuiSvgService,
    ) {
        tuiSvgService.define({ tuiIconArrowLeftLarge, tuiIconArrowRightLarge });
    }

    setHover(isHovered: boolean) {
        this.elemHoverService.setHover$(isHovered);
    } // для того чтобы на любой элемент мог управлять состоянием кнопки вот так #arrowButton -> arrowButton.setHover()
}
