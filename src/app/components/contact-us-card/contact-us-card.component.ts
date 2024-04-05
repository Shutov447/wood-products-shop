import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { AlertTriangleIconComponent } from '../alert-triangle-icon/alert-triangle-icon.component';
import { IDataForm } from './shared/types/data-form.type';
import { phoneNumberValidator } from './shared/form-validators/phoneNumber.validator';

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

    formGroup = this.formBuilder.group({
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

    onSubmit() {
        this.formGroup.valid && this.submitForm();
    }

    private submitForm() {
        // eslint-disable-next-line no-console
        console.log(this.formGroup.value);
    }
}
