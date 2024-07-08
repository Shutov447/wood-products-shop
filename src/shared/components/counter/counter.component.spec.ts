import {
    ComponentFixture,
    ComponentFixtureAutoDetect,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';

import { first } from 'rxjs';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
    let component: CounterComponent;
    let fixture: ComponentFixture<CounterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CounterComponent],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CounterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    test('should create', () => {
        expect(component).toBeTruthy();
    });

    test('emitNumber method должен эмитить number', () => {
        component.number = 10;
        component.emitNumber();
        component.getNumber
            .pipe(first())
            .subscribe((number: number) => expect(number).toBe(10));
    });

    describe('ngOnInit method', () => {
        test('number должен быть равен min после ngOnInit', () => {
            component.min = 3;
            component.ngOnInit();

            expect(component.number).toBe(3);
        });
    });

    describe('DOM rendering', () => {
        let numberElem: HTMLElement;

        beforeEach(() => {
            numberElem = fixture.nativeElement
                .getElementsByClassName('number')
                .item(0);
        });

        describe('button with increment method', () => {
            let incrementButton: HTMLElement;

            beforeEach(() => {
                incrementButton = fixture.nativeElement
                    .getElementsByClassName('plus')
                    .item(0);
            });

            test('должен содержать "+"', () => {
                expect(incrementButton.textContent).toContain('+');
            });

            test('должен увеличивать number если он меньше max', () => {
                component.number = 1;
                component.max = 5;
                incrementButton.click();
                fixture.detectChanges();

                expect(Number(numberElem.textContent)).toBe(2);
            });

            describe('не должен увеличивать number если...', () => {
                beforeEach(() => {
                    component.max = 4;
                });

                test('...он равен max', () => {
                    component.number = 4;
                    incrementButton.click();
                    fixture.detectChanges();

                    expect(Number(numberElem.textContent)).toBe(4);
                });

                test('...он больше max', () => {
                    component.number = 9;
                    incrementButton.click();
                    fixture.detectChanges();

                    expect(Number(numberElem.textContent)).toBe(9);
                });
            });
        });

        describe('button with decrement method', () => {
            let decrementButton: HTMLElement;

            beforeEach(() => {
                decrementButton = fixture.nativeElement
                    .getElementsByClassName('minus')
                    .item(0);
            });

            test('должен содержать кнопку с "–"', () => {
                expect(decrementButton.innerHTML).toContain('–');
            });

            test('должен уменьшать number если он больше min', () => {
                component.min = 1;
                component.number = 5;
                decrementButton.click();
                fixture.detectChanges();

                expect(Number(numberElem.textContent)).toBe(4);
            });

            describe('не должен уменьшать number если...', () => {
                beforeEach(() => {
                    component.min = 1;
                });

                test('...он равен min', () => {
                    component.number = 1;
                    decrementButton.click();
                    fixture.detectChanges();

                    expect(Number(numberElem.textContent)).toBe(1);
                });

                test('...он меньше min', () => {
                    component.number = -2;
                    decrementButton.click();
                    fixture.detectChanges();

                    expect(Number(numberElem.textContent)).toBe(-2);
                });
            });
        });
    });
});
