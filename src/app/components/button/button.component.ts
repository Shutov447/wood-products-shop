import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Input,
} from '@angular/core';
import { ButtonSize } from './shared/types/button-size.type';
import { ElemHoverService } from './shared/services/elem-hover.service';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
    readonly mediumWood = '#a9845c';
    readonly rope = '#926341';

    readonly isHovered$ = this.elemHoverService.isHovered$;

    constructor(
        @Inject(ElemHoverService)
        private readonly elemHoverService: ElemHoverService,
    ) {}

    @Input() size: ButtonSize | null = null;
    @Input() pieceOfWoodCount: 0 | 1 | 2 = 0;
    @Input() haveBackground = false;
}
