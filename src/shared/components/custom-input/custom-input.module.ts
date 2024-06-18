import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { CheckboxListComponent, InputRangeComponent } from './components';
import { TranslatePipe } from '../../lib';

@NgModule({
    declarations: [InputRangeComponent, CheckboxListComponent],
    imports: [CommonModule, TranslatePipe, PushPipe],
    exports: [InputRangeComponent, CheckboxListComponent],
})
export class CustomInputModule {}
