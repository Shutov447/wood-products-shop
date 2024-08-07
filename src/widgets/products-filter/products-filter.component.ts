import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LetDirective, PushPipe } from '@ngrx/component';
import { BehaviorSubject, debounceTime, map, Subject, takeUntil } from 'rxjs';
import { cloneDeep } from 'lodash';
import {
    ButtonModule,
    CustomInputModule,
    IOutputRangeData,
    IChosenData,
    CheckboxListComponent,
    InputRangeComponent,
} from '@shared/components';
import { IResultFilterData, IOutputFilterData } from '@shared/api';
import { TranslatePipe } from '@shared/lib';
import { selectCategories } from '@shared/model';
import {
    ProductsFilterActions,
    ProductsFilterApiActions,
    selectFilteringDataForCurrentCategory,
} from './model';

@Component({
    selector: 'app-products-filter',
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        CustomInputModule,
        RouterModule,
        TranslatePipe,
        LetDirective,
        PushPipe,
    ],
    templateUrl: './products-filter.component.html',
    styleUrl: './products-filter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFilterComponent implements OnDestroy, OnInit {
    @Input() outputFilterDataAfter = 600;

    private readonly destroy$ = new Subject<void>();
    private readonly _getFilterData$ = new BehaviorSubject<IOutputFilterData>({
        category: '',
        ranges: [],
        choices: [],
    });

    @ViewChildren(InputRangeComponent)
    private readonly inputRanges: QueryList<InputRangeComponent> | null = null;
    @ViewChildren(CheckboxListComponent)
    private readonly checkboxLists: QueryList<CheckboxListComponent> | null =
        null;

    private filteringData: IOutputFilterData = {
        category: '',
        ranges: [],
        choices: [],
    };
    private rangesAmount = 0;
    private characteristicsAmount = 0;

    @Output() readonly getFilterData$ = this._getFilterData$
        .asObservable()
        .pipe(
            debounceTime(this.outputFilterDataAfter),
            map((filteringData) => cloneDeep(filteringData)),
            takeUntil(this.destroy$),
        );

    readonly filterData$ = this.store.select(
        selectFilteringDataForCurrentCategory,
    );
    readonly categories$ = this.store.select(selectCategories);
    readonly rangeMin = 0;

    constructor(
        private readonly store: Store,
        private readonly activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.store.dispatch(
            ProductsFilterApiActions.pageWithFilterDataOpened(),
        );

        this.activatedRoute.paramMap
            .pipe(takeUntil(this.destroy$))
            .subscribe((paramMap) => {
                const currentCategory = paramMap.get('category');

                if (currentCategory) {
                    this.resetFilteringData();

                    this.filteringData.category = currentCategory;

                    this.store.dispatch(
                        ProductsFilterActions.addFilteringDataForCategory({
                            currentCategory,
                        }),
                    );
                    this.emitFilterData();
                }
            });

        this.filterData$
            .pipe(takeUntil(this.destroy$))
            .subscribe((filterData) => {
                this.rangesAmount = (
                    filterData as IResultFilterData
                ).ranges.length;
                this.characteristicsAmount = (
                    filterData as IResultFilterData
                ).characteristics.length;
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    reset() {
        this.inputRanges?.forEach((range) => range.resetCurrentNumber());
        this.checkboxLists?.forEach((list) => list.reset());
    }

    getChosen(chosen: IChosenData) {
        if (this.filteringData.choices.length < this.characteristicsAmount) {
            this.filteringData.choices.push(chosen);

            return;
        }

        this.filteringData.choices.forEach((choice) => {
            if (choice.title === chosen.title) {
                choice.choices = chosen.choices;
            }
        });

        this.emitFilterData();
    }

    getRange(range: IOutputRangeData) {
        if (this.filteringData.ranges.length < this.rangesAmount) {
            this.filteringData.ranges.push(range);

            return;
        }

        this.filteringData.ranges.forEach((r) => {
            if (r.title === range.title) {
                r.from = range.from;
                r.to = range.to;
            }
        });

        this.emitFilterData();
    }

    private emitFilterData() {
        this._getFilterData$.next(this.filteringData);
    }

    private resetFilteringData() {
        this.filteringData.category = '';
        this.filteringData.ranges = [];
        this.filteringData.choices = [];
    }
}
