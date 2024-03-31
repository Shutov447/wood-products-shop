import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiSvgModule } from '@taiga-ui/core';
import { ButtonComponent } from './components/button/button.component';
import { ElemHoverDirective } from './shared/directives/elem-hover/elem-hover.directive';
import { ArrowButtonComponent } from './components/arrow-button/arrow-button.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';

@NgModule({
    declarations: [ButtonComponent, ArrowButtonComponent, IconButtonComponent],
    imports: [CommonModule, ElemHoverDirective, TuiSvgModule],
    exports: [ButtonComponent, ArrowButtonComponent, IconButtonComponent],
})
export class ButtonModule {}
