import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRangeComponent } from './input-range/input-range.component';
import { CheckboxListComponent } from './checkbox-list/checkbox-list.component';

@NgModule({
    declarations: [InputRangeComponent, CheckboxListComponent],
    imports: [CommonModule],
    exports: [InputRangeComponent, CheckboxListComponent],
})
export class CustomInputModule {}
