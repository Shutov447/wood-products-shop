import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { CheckboxListComponent } from './components/checkbox-list/checkbox-list.component';
import { InputRangeComponent } from './components/input-range/input-range.component';
import { TranslatePipe } from '../../../shared/lib/translations/pipe/translate.pipe';

@NgModule({
    declarations: [InputRangeComponent, CheckboxListComponent],
    imports: [CommonModule, TranslatePipe, PushPipe],
    exports: [InputRangeComponent, CheckboxListComponent],
})
export class CustomInputModule {}
