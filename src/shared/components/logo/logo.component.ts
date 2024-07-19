import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-logo',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './logo.component.html',
    styleUrl: './logo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
    @HostBinding('attr.data-cy') private readonly dataCy = 'logo';
}
