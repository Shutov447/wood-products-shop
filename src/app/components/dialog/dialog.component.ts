import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiScrollbarService } from '../../shared/for-tui-scrollbar/tui-scrollbar.service';

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
    @Input() hidden = true;
    @Output() readonly getHiddenState = new EventEmitter<boolean>();

    @HostBinding('style.display') display = this.hidden ? 'none' : 'flex';

    constructor(private readonly tuiScrollbarService: TuiScrollbarService) {}

    ngOnInit() {
        this.hide(this.hidden);
    }

    @HostListener('wheel', ['$event']) onScroll(event: WheelEvent) {
        event.preventDefault();
    }

    hide(isHidden: boolean) {
        this.hidden = isHidden;
        this.display = isHidden ? 'none' : 'flex';
        this.tuiScrollbarService.setHidden$(!isHidden);
        this.getHiddenState.emit(isHidden);
    }
}
