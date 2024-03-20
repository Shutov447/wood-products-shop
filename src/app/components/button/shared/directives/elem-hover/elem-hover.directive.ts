import { Directive, HostListener, Inject } from '@angular/core';
import { ElemHoverService } from '../../services/elem-hover.service';

@Directive({
    selector: '[appElemHover]',
    standalone: true,
})
export class ElemHoverDirective {
    constructor(
        @Inject(ElemHoverService)
        private readonly elemHoverService: ElemHoverService,
    ) {}

    @HostListener('mouseover') private onMouseover() {
        this.hover();
    }

    @HostListener('mouseout') private onMouseout() {
        this.hoverOut();
    }

    private hover() {
        this.elemHoverService.setHover$(true);
    }

    private hoverOut() {
        this.elemHoverService.setHover$(false);
    }
}
