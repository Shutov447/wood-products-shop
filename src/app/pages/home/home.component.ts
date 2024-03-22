import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiCarouselModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../../components/button/button.module';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [TuiCarouselModule, ButtonModule, CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    carouselItems = Array.from({ length: 6 }, (_, i) => i + 1);
}
