import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { productsFeatureSelector } from '../../store/products/products.selector';
import { IState } from '../../store/reducer';
import { ButtonModule } from '../button/button.module';
import { CustomInputModule } from '../custom-input/custom-input.module';
import { IOutputRangeData } from '../custom-input/shared/types/input-range-data.interface';
import { IChosenData } from '../custom-input/shared/types/characteristic-data.interface';
import { CheckboxListComponent } from '../custom-input/components/checkbox-list/checkbox-list.component';
import { InputRangeComponent } from '../custom-input/components/input-range/input-range.component';
import { ProductsService } from '../../shared/products/products.service';
import { IOutputFilterData } from './shared/types/output-filter-data.interface';
import { IProduct } from '../../../assets/products/types/product.interface';

@Component({
    selector: 'app-products-filter',
    standalone: true,
    imports: [ButtonModule, CommonModule, CustomInputModule, RouterModule],
    templateUrl: './products-filter.component.html',
    styleUrl: './products-filter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFilterComponent {
    @Output() getFilterData = new EventEmitter<IOutputFilterData>();

    private currentCategory: IProduct['category'] = '';
    private filteringData: IOutputFilterData = {
        category: this.currentCategory,
        ranges: [],
        choices: [],
    };

    readonly categories$ = this.store$.pipe(
        select(productsFeatureSelector),
        map(({ categories }) => categories),
    );

    @ViewChildren(InputRangeComponent)
    private readonly inputRanges: QueryList<InputRangeComponent> | null = null;
    @ViewChildren(CheckboxListComponent)
    private readonly checkboxLists: QueryList<CheckboxListComponent> | null =
        null;

    readonly showNumberInput = true;
    readonly rangeMin = 0;
    private rangesAmount = 0;
    private characteristicsAmount = 0;

    readonly filterData$ = this.activatedRoute.paramMap.pipe(
        switchMap((paramMap) => {
            const currentCategory = paramMap.get('category');

            if (currentCategory) {
                this.resetFilteringData();
                this.filteringData.category = currentCategory;

                return this.productsService.getfilteringData$(currentCategory);
            }

            return of();
        }),
    );

    constructor(
        private readonly store$: Store<IState>,
        private readonly activatedRoute: ActivatedRoute,
        @Inject(ProductsService)
        private readonly productsService: ProductsService,
    ) {
        this.filterData$.subscribe(({ ranges, characteristics }) => {
            this.rangesAmount = ranges.length;
            this.characteristicsAmount = characteristics.length;
        });
    }

    reset() {
        this.inputRanges?.forEach((range) => range.resetCurrentNumber());
        this.checkboxLists?.forEach((list) => list.reset());
    }

    getChosen(chosen: IChosenData) {
        if (this.filteringData?.choices.length < this.characteristicsAmount) {
            this.filteringData?.choices.push(chosen);
            this.getFilterData.emit(this.filteringData);

            return;
        }

        this.filteringData.choices.map((choice) => {
            if (choice.title === chosen.title) {
                choice.choices = chosen.choices;
            }
        });

        this.getFilterData.emit(this.filteringData);
    }

    getRange(range: IOutputRangeData) {
        if (this.filteringData?.ranges.length < this.rangesAmount) {
            this.filteringData?.ranges.push(range);
            this.getFilterData.emit(this.filteringData);

            return;
        }

        this.filteringData.ranges.map((r) => {
            if (r.title === range.title) {
                r.from = range.from;
                r.to = range.to;
            }
        });

        this.getFilterData.emit(this.filteringData);
    }

    private resetFilteringData() {
        this.filteringData.category = '';
        this.filteringData.ranges = [];
        this.filteringData.choices = [];
    }
}
