import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiSvgModule } from '@taiga-ui/core';
import { PushPipe } from '@ngrx/component';
import { ArrowButtonComponent } from './components/arrow-button/arrow-button.component';
import { ButtonComponent } from './components/button/button.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { ElemHoverDirective } from './lib/elem-hover-directive/elem-hover.directive';

@NgModule({
    declarations: [ButtonComponent, ArrowButtonComponent, IconButtonComponent],
    imports: [CommonModule, ElemHoverDirective, TuiSvgModule, PushPipe],
    exports: [ButtonComponent, ArrowButtonComponent, IconButtonComponent],
})
export class ButtonModule {}
