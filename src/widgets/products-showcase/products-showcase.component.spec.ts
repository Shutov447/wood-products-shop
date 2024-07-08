import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IProductsState, ProductsActions, selectProducts } from '@shared/model';
import { CommonModule } from '@angular/common';
import {
    Router,
    RouterLink,
    RouterModule,
    provideRouter,
} from '@angular/router';
import { ProductCardComponent } from '@features/product-card';
import { LetDirective, PushPipe } from '@ngrx/component';
import { TranslatePipe } from '@shared/lib';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IProduct } from '@shared/api';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ProductsShowcaseComponent } from './products-showcase.component';

describe('ProductsShowcaseComponent', () => {
    let component: ProductsShowcaseComponent;
    let fixture: ComponentFixture<ProductsShowcaseComponent>;
    let store: MockStore;
    const productsInitialState: Pick<
        IProductsState,
        'filteredProducts' | 'categories'
    > = {
        filteredProducts: [
            {
                url: '',
                vendor_code: 0,
                name: '',
                price: 0,
                rating: 0,
                description: '',
                characteristics: [{ value: '', description: '' }],
                photos: [''],
                category: 'testKraski',
            },
        ],
        categories: ['testSad', 'testKraski'],
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ProductsShowcaseComponent,
                ProductCardComponent,
                CommonModule,
                RouterModule,
                TranslatePipe,
                LetDirective,
                PushPipe,
                HttpClientTestingModule,
            ],
            providers: [
                provideMockStore({
                    selectors: [
                        {
                            selector: selectProducts,
                            value: productsInitialState,
                        },
                    ],
                }),
                provideRouter([]),
            ],
        }).compileComponents();

        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(ProductsShowcaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        jest.spyOn(component, 'filterProducts');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('инициализация компонента', () => {
        it('filterProducts method должен вызываться один раз c selectedCategory', () => {
            component.ngOnInit();
            expect(component.filterProducts).toHaveBeenNthCalledWith(
                1,
                component.selectedCategory,
            );
        });
    });

    describe('filterProducts method', () => {
        const testCategory = 'testKraski';

        beforeEach(() => {
            jest.spyOn(store, 'dispatch');
            component.filterProducts(testCategory);
        });

        it('должен обновлять значение selectedCategory', () => {
            expect(component.selectedCategory).toBe(testCategory);
        });

        it('должен диспатчить ProductsActions.filterByCategoryAndAmount в store', () => {
            expect(store.dispatch).toHaveBeenCalledWith(
                ProductsActions.filterByCategoryAndAmount({
                    category: testCategory,
                    amount: 9,
                }),
            );
        });

        it(`должен обновиться filteredProducts в объекте,
            который приходит из потока products$`, () => {
            let updatedFilteredProducts: readonly IProduct[] | undefined;

            component.products$.subscribe((res) => {
                updatedFilteredProducts = res.filteredProducts;
            });

            expect(updatedFilteredProducts).toEqual(
                productsInitialState.filteredProducts,
            );
        });
    });

    describe('DOM Manipulation', () => {
        let categoryButtons: HTMLElement[];
        const testTranslate: Record<string, string> = {
            testSad: 'тестСад',
            testKraski: 'тестКраски',
        };

        beforeEach(async () => {
            jest.spyOn(TranslatePipe.prototype, 'transform')
                .mockReturnValueOnce(of(testTranslate['testSad']))
                .mockReturnValueOnce(of(testTranslate['testKraski']));
            fixture = TestBed.createComponent(ProductsShowcaseComponent);
            fixture.detectChanges();

            categoryButtons = fixture.debugElement
                .queryAll(By.css('.category'))
                .map((catButDe) => catButDe.nativeElement);
        });

        it('компонент должен отображать все категории из IProductsState.categories', () => {
            productsInitialState.categories.forEach((category, index) => {
                expect(categoryButtons[index].textContent).toContain(
                    testTranslate[category],
                );
            });

            expect(categoryButtons).toHaveLength(
                productsInitialState.categories.length,
            );
        });

        describe('кнопка категории', () => {
            let categoryKraskiButton: HTMLElement;

            beforeEach(() => {
                categoryKraskiButton = categoryButtons[1];
                jest.spyOn(categoryKraskiButton, 'click').mockImplementation(
                    () => {
                        component.filterProducts('testKraski');
                    },
                );
                categoryKraskiButton.click();
                categoryKraskiButton.dispatchEvent(new Event('click'));
                fixture.detectChanges();
            });

            it(`если категория ровна selectedCategory,
                то к этой категории должен применяться css-класс selected-category`, () => {
                const translatedSelectedCategory =
                    testTranslate[component.selectedCategory];
                const categoryButton = categoryButtons.find((catBut) => {
                    return catBut.textContent?.includes(
                        translatedSelectedCategory,
                    );
                });

                expect(categoryButton?.textContent).toMatch(
                    translatedSelectedCategory,
                );
                expect(categoryButton?.classList).toContain(
                    'selected-category',
                );
            });

            it('при клике на категорию должен вызываться filterProducts method', () => {
                expect(component.filterProducts).toHaveBeenNthCalledWith(
                    1,
                    'testKraski',
                );
            });

            it('при клике на категорию должны обновляться все карточки продуктов', () => {
                const productCards = fixture.debugElement
                    .queryAll(By.css('app-product-card'))
                    .map((productCard) => productCard.nativeElement);

                expect(productCards).toHaveLength(1);
            });

            describe('маршрутизация', () => {
                let linkDes: DebugElement[];

                beforeEach(() => {
                    fixture.detectChanges();
                    linkDes = fixture.debugElement.queryAll(
                        By.directive(RouterLink),
                    );
                });

                it(`при клике на кнопку "показать все"
                    должна происходить навигация по пути "/catalog/testKraski"`, fakeAsync(() => {
                    const seeAllLinkDe = linkDes.at(-1);

                    TestBed.inject(Router).resetConfig([
                        { path: '**', children: [] },
                    ]);
                    seeAllLinkDe?.triggerEventHandler('click', {
                        button: 0,
                    });
                    fixture.detectChanges();
                    tick();

                    expect(TestBed.inject(Router).url).toBe(
                        '/catalog/testKraski',
                    );
                }));
            });
        });
    });
});
