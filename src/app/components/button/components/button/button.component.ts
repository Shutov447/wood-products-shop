import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonSize } from '../../shared/types/button-size.type';
import { ElemHoverService } from '../../shared/services/elem-hover/elem-hover.service';
import { PieceOfWood } from '../../shared/types/peice-of-wood.type';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ElemHoverService],
})
export class ButtonComponent {
    @Input() size: ButtonSize | null = null;
    @Input() pieceOfWood: PieceOfWood = 'none';
    @Input() haveBackground = false;

    readonly mediumWood = '#a9845c';
    readonly rope = '#926341';
    readonly isHovered$ = this.elemHoverService.isHovered$;

    constructor(private readonly elemHoverService: ElemHoverService) {}
}
