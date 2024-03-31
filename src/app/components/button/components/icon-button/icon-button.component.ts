import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconButton } from '../../shared/types/icon-button.type';
import { ElemHoverService } from '../../shared/services/elem-hover/elem-hover.service';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrl: './icon-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ElemHoverService],
})
export class IconButtonComponent {
    @Input({ required: true }) icon: IconButton | null = null;

    readonly white = '#ffffff';
    readonly frangipani = '#ffd6a8';
    readonly isHovered$ = this.elemHoverService.isHovered$;

    constructor(private readonly elemHoverService: ElemHoverService) {}
}
