import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiSvgModule } from '@taiga-ui/core';
import { ButtonComponent } from './components/button/button.component';
import { ElemHoverDirective } from './shared/directives/elem-hover/elem-hover.directive';
import { ArrowButtonComponent } from './components/arrow-button/arrow-button.component';

@NgModule({
    declarations: [ButtonComponent, ArrowButtonComponent],
    imports: [CommonModule, ElemHoverDirective, TuiSvgModule],
    exports: [ButtonComponent, ArrowButtonComponent],
})
export class ButtonModule {}
