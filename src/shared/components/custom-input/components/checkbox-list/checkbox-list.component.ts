import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { IChosenData } from '../../lib';

@Component({
    selector: 'app-checkbox-list',
    templateUrl: './checkbox-list.component.html',
    styleUrl: './checkbox-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxListComponent implements AfterViewInit {
    @Input({ required: true }) choices: string[] = [];
    @Input() title: string | undefined;

    @Output() readonly getCurrentChosen = new EventEmitter<IChosenData>();

    isShow = true;
    chosen: string[] = [];

    @ViewChildren('checkbox')
    private readonly checkboxes: QueryList<
        ElementRef<HTMLInputElement>
    > | null = null;

    ngAfterViewInit() {
        this.emitChosen();
    }

    reset() {
        this.checkboxes?.forEach((checkbox) => {
            checkbox.nativeElement.checked = false;
        });
        this.chosen = [];
        this.emitChosen();
    }

    setChosen(event: Event) {
        const target = (event as InputEvent).target as HTMLInputElement;
        const isExcludedValue =
            target.checked && !this.chosen.includes(target.value);
        const deleteChoice = () => {
            this.chosen = this.chosen.filter(
                (chosen) => chosen !== target.value,
            );
        };
        const addChoice = () => this.chosen.push(target.value);

        isExcludedValue ? addChoice() : deleteChoice();

        this.emitChosen();
    }

    emitChosen() {
        this.getCurrentChosen.emit({
            title: this.title,
            choices: this.chosen,
        });
    }
}
