import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiSvgModule } from '@taiga-ui/core';
import { PushPipe } from '@ngrx/component';
import {
    ArrowButtonComponent,
    ButtonComponent,
    IconButtonComponent,
} from './components';
import { ElemHoverDirective } from './lib';

@NgModule({
    declarations: [ButtonComponent, ArrowButtonComponent, IconButtonComponent],
    imports: [CommonModule, ElemHoverDirective, TuiSvgModule, PushPipe],
    exports: [ButtonComponent, ArrowButtonComponent, IconButtonComponent],
})
export class ButtonModule {}
