import { AbstractControl } from '@angular/forms';

export interface IDataForm {
    name: string;
    formControl: AbstractControl<unknown, unknown> | null;
    needData: string;
}
