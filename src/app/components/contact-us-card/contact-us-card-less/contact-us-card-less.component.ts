import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactUsCardComponent } from '../contact-us-card-default/contact-us-card.component';
import { AlertTriangleIconComponent } from '../../alert-triangle-icon/alert-triangle-icon.component';
import { ButtonModule } from '../../button/button.module';
import { IDataForm } from '../shared/types/data-form.type';

@Component({
    selector: 'app-contact-us-card-less',
    standalone: true,
    imports: [
        CommonModule,
        AlertTriangleIconComponent,
        ButtonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './contact-us-card-less.component.html',
    styleUrl: './contact-us-card-less.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsCardLessComponent extends ContactUsCardComponent {
    constructor(private readonly formBuilder_LESS: FormBuilder) {
        super(formBuilder_LESS);
    }

    readonly formGroup_LESS: FormGroup = this.formBuilder_LESS.group({
        userDataGroup: this.formBuilder_LESS.group({
            ...this.formGroup.controls,
        }),

        userComment: [''],
    });

    get userComment() {
        return this.formGroup_LESS.get('userComment');
    }

    readonly dataForms_LESS: IDataForm = {
        name: 'userComment',
        formControl: this.userComment,
        needData: 'Ваш комментарий',
    };
}
