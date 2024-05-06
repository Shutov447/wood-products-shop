import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-counter',
    standalone: true,
    templateUrl: './counter.component.html',
    styleUrl: './counter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
    @Input() number = 0;
    @Input() min = 0;
    @Input() max = Infinity;

    @Output() getNumber = new EventEmitter<number>();

    ngOnInit() {
        this.number = this.min;
        this.emitNumber();
    }

    increment() {
        if (this.number >= this.max) return;

        this.number++;
        this.emitNumber();
    }

    decrement() {
        if (this.number <= this.min) return;

        this.number--;
        this.emitNumber();
    }

    emitNumber() {
        this.getNumber.emit(this.number);
    }
}
