import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { ElemHoverDirective } from './shared/directives/elem-hover/elem-hover.directive';
import { ElemHoverService } from './shared/services/elem-hover.service';

@NgModule({
    declarations: [ButtonComponent],
    imports: [CommonModule, ElemHoverDirective],
    exports: [ButtonComponent],
    providers: [ElemHoverService],
})
export class ButtonModule {}
