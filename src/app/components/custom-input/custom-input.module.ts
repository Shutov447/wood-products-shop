import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRangeComponent } from './components/input-range/input-range.component';
import { CheckboxListComponent } from './components/checkbox-list/checkbox-list.component';
import { TranslatePipe } from '../../shared/translations/pipe/translate.pipe';

@NgModule({
    declarations: [InputRangeComponent, CheckboxListComponent],
    imports: [CommonModule, TranslatePipe],
    exports: [InputRangeComponent, CheckboxListComponent],
})
export class CustomInputModule {}
