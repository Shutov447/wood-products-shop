import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRangeComponent } from './input-range/input-range.component';

@NgModule({
    declarations: [InputRangeComponent],
    imports: [CommonModule],
    exports: [InputRangeComponent],
})
export class CustomInputModule {}
