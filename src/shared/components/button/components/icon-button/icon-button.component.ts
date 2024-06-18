import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { tuiHexToRGBA } from '@taiga-ui/cdk';
import { IconButton } from '../../lib';
import { ElemHoverService } from '../../model';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrl: './icon-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ElemHoverService],
})
export class IconButtonComponent {
    @Input({ required: true }) icon: IconButton | null = null;

    @Input() defaultColor = '#ffffff';
    @Input() hoverColor = '#ffd6a8';
    @Input() bgColor = '#3b3937';
    readonly isHovered$ = this.elemHoverService.isHovered$;

    constructor(private readonly elemHoverService: ElemHoverService) {}

    hexToRGBA(hex: string, alpha?: number): string {
        return tuiHexToRGBA(hex, alpha);
    }
}
