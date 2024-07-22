/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, provideRouter, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LetDirective, PushPipe } from '@ngrx/component';
import {
    ButtonModule,
    CheckboxListComponent,
    CustomInputModule,
    InputRangeComponent,
} from '@shared/components';
import { TranslatePipe } from '@shared/lib';
import { selectCategories } from '@shared/model';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ProductsFilterComponent } from './products-filter.component';
import {
    ProductsFilterActions,
    ProductsFilterApiActions,
    selectFilteringDataForCurrentCategory,
} from './model';
import { categoriesMock, resultFilterDataMock } from './products-filter.mock';

describe('ProductsFilterComponent', () => {
    let component: ProductsFilterComponent;
    let fixture: ComponentFixture<ProductsFilterComponent>;
    let store: MockStore;
    const paramMapSubject$ = new BehaviorSubject({
        get: (key: string): null | string => {
            if (key === 'category') {
                return null;
            }

            return null;
        },
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ProductsFilterComponent,
                ButtonModule,
                CommonModule,
                CustomInputModule,
                RouterModule,
                TranslatePipe,
                LetDirective,
                PushPipe,
            ],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideMockStore({
                    selectors: [
                        {
                            selector: selectFilteringDataForCurrentCategory,
                            value: resultFilterDataMock,
                        },
                        {
                            selector: selectCategories,
                            value: categoriesMock,
                        },
                    ],
                }),
                provideRouter([{ path: '**', children: [] }]),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: paramMapSubject$.asObservable(),
                    },
                },
            ],
        }).compileComponents();

        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(ProductsFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('инициализация компонента', () => {
        const resetFilteringDataSpy = jest.spyOn(
            ProductsFilterComponent.prototype as any,
            'resetFilteringData',
        );

        beforeEach(() => {
            jest.clearAllMocks();
            jest.spyOn(store, 'dispatch');
        });

        it('должен диспатчить ProductsFilterApiActions.pageWithFilterDataOpened в store', () => {
            component.ngOnInit();

            expect(store.dispatch).toHaveBeenNthCalledWith(
                1,
                ProductsFilterApiActions.pageWithFilterDataOpened(),
            );
        });

        describe('если Boolean(paramMap.get("category")) возвращает true', () => {
            const testCategory1 = 'testCategory1';

            beforeEach(() => {
                paramMapSubject$.next({
                    get: (key: string) => {
                        if (key === 'category') {
                            return testCategory1;
                        }

                        return null;
                    },
                });
            });

            it('resetFilteringData должен вызваться один раз', () => {
                expect(resetFilteringDataSpy).toHaveBeenCalledTimes(1);
            });

            it('должен диспатчить ProductsFilterActions.addFilteringDataForCategory в store', () => {
                expect(store.dispatch).toHaveBeenNthCalledWith(
                    1,
                    ProductsFilterActions.addFilteringDataForCategory({
                        currentCategory: 'testCategory1',
                    }),
                );
            });
        });

        describe('если Boolean(paramMap.get("category")) возвращает false', () => {
            beforeEach(() => {
                paramMapSubject$.next({
                    get: () => null,
                });
            });

            it('resetFilteringData не должен вызваться', () => {
                expect(resetFilteringDataSpy).toHaveBeenCalledTimes(0);
            });

            it('store.dispatch не должен вызываться', () => {
                expect(store.dispatch).toHaveBeenCalledTimes(0);
            });
        });
    });

    it('reset method', () => {
        const resetCurrentNumberSpy = jest.spyOn(
            InputRangeComponent.prototype,
            'resetCurrentNumber',
        );
        const resetSpy = jest.spyOn(CheckboxListComponent.prototype, 'reset');

        component.reset();

        expect(resetCurrentNumberSpy).toHaveBeenCalledTimes(
            resultFilterDataMock.ranges.length,
        );
        expect(resetSpy).toHaveBeenCalledTimes(
            resultFilterDataMock.characteristics.length,
        );
    });

    describe('get filter data from components methods', () => {
        const emitFilterDataSpy = jest.spyOn(
            ProductsFilterComponent.prototype as any,
            'emitFilterData',
        );
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('getChosen method должен менять filterData.choices и вызывать метод emitFilterData', () => {
            const chosenData = {
                title: 'Тип продукта',
                choices: ['Грунт', 'Стимулятор роста'],
            };

            jest.spyOn(component, 'getChosen');
            component.getChosen(chosenData);

            return new Promise<void>((done) => {
                component.getFilterData$.subscribe((filterData) => {
                    expect(filterData.choices[0]).toEqual(chosenData);
                    expect(emitFilterDataSpy).toHaveBeenCalledTimes(1);
                    done();
                });
            });
        });

        it('getRange method должен менять filterData.ranges и вызывать метод emitFilterData', () => {
            const outputRangeData = { title: 'price', from: 50, to: 200 };

            jest.spyOn(component, 'getRange');
            component.getRange(outputRangeData);

            return new Promise<void>((done) => {
                component.getFilterData$.subscribe((filterData) => {
                    expect(filterData.ranges[0]).toEqual(outputRangeData);
                    expect(emitFilterDataSpy).toHaveBeenCalledTimes(1);
                    done();
                });
            });
        });
    });

    describe('DOM', () => {
        it('клик по копке "Сбросить фильтры" должен вызывать метод reset', () => {
            const resetFiltersButton = fixture.debugElement.query(
                By.css('[data-jest="reset-filters-button"]'),
            ).nativeElement;
            const reset = jest.spyOn(component, 'reset');

            resetFiltersButton.click();

            expect(reset).toHaveBeenCalledTimes(1);
        });
    });
});
