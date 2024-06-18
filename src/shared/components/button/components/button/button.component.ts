import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonSize, PieceOfWood } from '../../lib';
import { ElemHoverService } from '../../model';

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
    @Input() isDisabled = false;

    readonly mediumWood = '#a9845c';
    readonly rope = '#926341';
    readonly isHovered$ = this.elemHoverService.isHovered$;

    constructor(private readonly elemHoverService: ElemHoverService) {}
}
