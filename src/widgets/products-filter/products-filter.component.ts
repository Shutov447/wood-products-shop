import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnDestroy,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LetDirective, PushPipe } from '@ngrx/component';
import { Subject, takeUntil } from 'rxjs';
import { cloneDeep } from 'lodash';
import {
    ButtonModule,
    CustomInputModule,
    IOutputRangeData,
    IChosenData,
    CheckboxListComponent,
    InputRangeComponent,
} from '@shared/components';
import { IProduct } from '@assets/products/types/product.interface';
import { TranslatePipe } from '@shared/lib';
import { selectProducts } from '@app/core';
import { IResultFilterData } from '@assets/products/types/for-filtering-products.interface';
import {
    ProductsFilterActions,
    ProductsFilterApiActions,
} from './model/products-filter.actions';
import { selectFilteringDataForCurrentCategory } from './model/products-filter.selectors';
import { IOutputFilterData } from './lib/types/output-filter-data.interface';

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
export class ProductsFilterComponent implements OnDestroy {
    private readonly destroy$ = new Subject<void>();
    @ViewChildren(InputRangeComponent)
    private readonly inputRanges: QueryList<InputRangeComponent> | null = null;
    @ViewChildren(CheckboxListComponent)
    private readonly checkboxLists: QueryList<CheckboxListComponent> | null =
        null;

    @Output() readonly getFilterData = new EventEmitter<IOutputFilterData>();

    readonly filterData$ = this.store.select(
        selectFilteringDataForCurrentCategory,
    );

    readonly productsState$ = this.store.select(selectProducts);
    readonly showNumberInput = true;
    readonly rangeMin = 0;

    private currentCategory: IProduct['category'] = '';
    private filteringData: IOutputFilterData = {
        category: this.currentCategory,
        ranges: [],
        choices: [],
    };
    private rangesAmount = 0;
    private characteristicsAmount = 0;

    constructor(
        private readonly store: Store,
        private readonly activatedRoute: ActivatedRoute,
    ) {
        this.store.dispatch(
            ProductsFilterApiActions.pageWithFilterDataOpened({
                currentCategory: this.currentCategory,
            }),
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
                }
            });

        this.filterData$.subscribe((filterData) => {
            this.rangesAmount = (filterData as IResultFilterData).ranges.length;
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
            this.emitFilterData();

            return;
        }

        this.filteringData.choices.map((choice) => {
            if (choice.title === chosen.title) {
                choice.choices = chosen.choices;
            }
        });
        this.emitFilterData();
    }

    getRange(range: IOutputRangeData) {
        if (this.filteringData.ranges.length < this.rangesAmount) {
            this.filteringData.ranges.push(range);
            this.emitFilterData();
            return;
        }

        this.filteringData.ranges.map((r) => {
            if (r.title === range.title) {
                r.from = range.from;
                r.to = range.to;
            }
        });

        this.emitFilterData();
    }

    private emitFilterData() {
        this.getFilterData.emit(cloneDeep(this.filteringData));
    }

    private resetFilteringData() {
        this.filteringData.category = '';
        this.filteringData.ranges = [];
        this.filteringData.choices = [];
    }
}
