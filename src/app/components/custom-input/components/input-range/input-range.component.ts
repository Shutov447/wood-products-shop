import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { IOutputRangeData } from '../../shared/types/input-range-data.interface';

@Component({
    selector: 'app-input-range',
    templateUrl: './input-range.component.html',
    styleUrl: './input-range.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputRangeComponent implements OnInit, AfterViewInit {
    @Input({ required: true }) min = 0;
    @Input({ required: true }) max = 0;
    @Input() initCurrentFrom: number | undefined = 0;
    @Input() initCurrentTo: number | undefined = 0;
    @Input() title: string | undefined;
    @Input() showNumberInput: boolean | undefined = false;

    @Output() getCurrentRange = new EventEmitter<IOutputRangeData>();

    @ViewChild('numberCurrentFrom', { read: ElementRef, static: true })
    private readonly numberCurrentFrom: ElementRef<HTMLInputElement> | null =
        null;
    @ViewChild('numberCurrentTo', { read: ElementRef, static: true })
    private readonly numberCurrentTo: ElementRef<HTMLInputElement> | null =
        null;
    @ViewChild('rangeCurrentFrom', { read: ElementRef, static: true })
    private readonly rangeCurrentFrom: ElementRef<HTMLInputElement> | null =
        null;
    @ViewChild('rangeCurrentTo', { read: ElementRef, static: true })
    private readonly rangeCurrentTo: ElementRef<HTMLInputElement> | null = null;

    private set nCurrentFromV(number: number) {
        this.numberCurrentFrom!.nativeElement.value = String(number);
    }
    private set nCurrentToV(number: number) {
        this.numberCurrentTo!.nativeElement.value = String(number);
    }
    private set rCurrentFromV(number: number) {
        this.rangeCurrentFrom!.nativeElement.value = String(number);
    }
    private set rCurrentToV(number: number) {
        this.rangeCurrentTo!.nativeElement.value = String(number);
    }

    private get rCurrentFromV() {
        return Number(this.rangeCurrentFrom?.nativeElement.value);
    }
    private get rCurrentToV() {
        return Number(this.rangeCurrentTo?.nativeElement.value);
    }
    private get nCurrentFromV() {
        return Number(this.numberCurrentFrom?.nativeElement.value);
    }
    private get nCurrentToV() {
        return Number(this.numberCurrentTo?.nativeElement.value);
    }

    ngOnInit() {
        !this.initCurrentFrom && (this.initCurrentFrom = this.min);
        !this.initCurrentTo && (this.initCurrentTo = this.max);
    }

    ngAfterViewInit() {
        this.getRange();
    }

    setCurrentNumber(event: Event) {
        const inputEvent = event as InputEvent;
        const target = inputEvent.target as HTMLInputElement;
        const isCurrentFrom = target.id === 'currentFrom';
        const isCurrentTo = target.id === 'currentTo';

        const isRangeInput = target.type === 'range';

        if (isRangeInput) {
            const isLimit = this.rCurrentFromV >= this.rCurrentToV;

            if (isLimit) {
                this.nCurrentFromV = this.rCurrentToV;
                this.nCurrentToV = this.rCurrentFromV;

                return;
            }

            if (isCurrentFrom) {
                this.nCurrentFromV = this.rCurrentFromV;

                return;
            }

            if (isCurrentTo) {
                this.nCurrentToV = this.rCurrentToV;

                return;
            }
        }

        const isNumberInput = target.type === 'number';

        if (isNumberInput) {
            if (this.nCurrentFromV > this.max) {
                this.nCurrentFromV = this.max;
                this.nCurrentToV = this.max;
                this.rCurrentFromV = this.max;
                this.rCurrentToV = this.max;

                return;
            }

            if (this.nCurrentToV > this.max) {
                this.nCurrentToV = this.max;
                this.rCurrentToV = this.max;

                return;
            }

            if (isCurrentFrom) {
                if (this.nCurrentFromV > this.nCurrentToV) {
                    this.nCurrentToV = this.nCurrentFromV;
                    this.rCurrentFromV = this.nCurrentFromV;
                    this.rCurrentToV = this.nCurrentFromV;

                    return;
                }

                this.rCurrentFromV = this.nCurrentFromV;

                return;
            }

            if (isCurrentTo) {
                if (this.nCurrentFromV >= this.nCurrentToV) {
                    this.nCurrentFromV = this.nCurrentToV;
                    this.rCurrentToV = this.nCurrentFromV;
                    this.rCurrentFromV = this.nCurrentFromV;

                    return;
                }

                this.rCurrentToV = this.nCurrentToV;

                return;
            }
        }
    }

    resetCurrentNumber() {
        this.rCurrentFromV = this.min;
        this.rCurrentToV = this.max;
        this.nCurrentFromV = this.min;
        this.nCurrentToV = this.max;
        this.getRange();
    }

    getRange() {
        this.getCurrentRange.emit({
            title: this.title,
            from: this.nCurrentFromV,
            to: this.nCurrentToV,
        });
    }
}
