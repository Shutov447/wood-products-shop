import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'app-input-range',
    templateUrl: './input-range.component.html',
    styleUrl: './input-range.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputRangeComponent implements OnInit {
    @Input({ required: true }) min = 0;
    @Input({ required: true }) max = 0;
    @Input() title: string | null = null;
    @Input() currentFrom = 0;
    @Input() currentTo = 0;
    @Input() showNumberInput = false;

    ngOnInit() {
        this.currentFrom = this.min;
        this.currentTo = this.max;
    }

    setCurrentNumber(event: Event) {
        const inputEvent = event as InputEvent;
        const target = inputEvent.target as HTMLInputElement;
        const currentNumber = Math.round(Number(target.value));

        const isCurrentFrom = target.id === 'currentFrom';

        if (isCurrentFrom) {
            const isLimitByRangeCurrentFrom =
                currentNumber >= this.currentTo && target.type === 'range';

            if (isLimitByRangeCurrentFrom) {
                event.preventDefault();
                target.value = String(this.currentTo);
                this.currentFrom = this.currentTo;

                return;
            }

            const isLimitByNumberCurrentFrom =
                currentNumber >= this.currentTo && target.type === 'number';

            if (isLimitByNumberCurrentFrom) {
                const inputCurrentTo = target.nextSibling as HTMLInputElement;

                if (Number(target.value) > this.max) {
                    inputCurrentTo.value = String(this.max);
                    target.value = String(this.max);
                    this.currentFrom = this.max;

                    return;
                }

                inputCurrentTo.value = target.value;
                this.currentFrom = currentNumber;

                return;
            }

            this.currentFrom = currentNumber;

            return;
        }

        const isCurrentTo = target.id === 'currentTo';

        if (isCurrentTo) {
            const isLimitByRangeCurrentTo =
                currentNumber <= this.currentFrom && target.type === 'range';

            if (isLimitByRangeCurrentTo) {
                event.preventDefault();
                target.value = String(this.currentFrom);
                this.currentTo = this.currentFrom;

                return;
            }
            const isLimitByNumberCurrentTo =
                currentNumber <= this.currentFrom && target.type === 'number';

            if (isLimitByNumberCurrentTo) {
                const inputCurrentFrom =
                    target.previousSibling as HTMLInputElement;

                inputCurrentFrom.value = target.value;
                this.currentTo = this.currentFrom;

                return;
            }

            this.currentTo = currentNumber;

            return;
        }
    }

    resetCurrentNumber() {
        this.currentFrom = this.min;
        this.currentTo = this.max;
    }
}
