import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule, AlertTriangleIconComponent } from '@shared/components';
import { phoneNumberValidator } from '../../lib/form-validators/phoneNumber.validator';
import { IDataForm } from '../../lib/types/data-form.type';

@Component({
    selector: 'app-contact-us-card',
    standalone: true,
    imports: [
        ButtonModule,
        ReactiveFormsModule,
        CommonModule,
        AlertTriangleIconComponent,
    ],
    templateUrl: './contact-us-card.component.html',
    styleUrl: './contact-us-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsCardComponent {
    constructor(private readonly formBuilder: FormBuilder) {}

    formGroup: FormGroup = this.formBuilder.group({
        userName: ['', [Validators.required]],
        userPhoneNumber: ['', [Validators.required, phoneNumberValidator]],
    });

    get userName() {
        return this.formGroup.get('userName');
    }

    get userPhoneNumber() {
        return this.formGroup.get('userPhoneNumber');
    }

    readonly dataForms: IDataForm[] = [
        {
            name: 'userName',
            formControl: this.userName,
            needData: 'Как вас зовут?',
        },
        {
            name: 'userPhoneNumber',
            formControl: this.userPhoneNumber,
            needData: 'Ваш телефон',
        },
    ];

    onSubmit(formGroup: FormGroup) {
        // eslint-disable-next-line no-console
        console.log(formGroup.value);
    }
}
