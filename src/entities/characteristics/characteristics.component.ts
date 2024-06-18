import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICharacteristic } from '@shared/api';

@Component({
    selector: 'app-characteristics',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './characteristics.component.html',
    styleUrl: './characteristics.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacteristicsComponent {
    @Input() title: string | null = null;
    @Input({ required: true }) characteristics: ICharacteristic[] | undefined;
}
