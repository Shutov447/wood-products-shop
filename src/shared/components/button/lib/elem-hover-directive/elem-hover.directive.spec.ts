/* eslint-disable @typescript-eslint/no-explicit-any */
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElemHoverDirective } from './elem-hover.directive';
import { ElemHoverService } from '../../model';

@Component({
    standalone: true,
    imports: [ElemHoverDirective, PushPipe],
    providers: [ElemHoverService],
    template: `
        <div
            appElemHover
            id="testElem"
        ></div>
        <div id="hoverElem">
            {{ (isHovered$ | ngrxPush) ? 'testHover' : 'testHoverOut' }}
        </div>
    `,
})
class ForElemHoverDirectiveTestComponent {
    readonly isHovered$ = this.elemHoverService.isHovered$;

    constructor(private readonly elemHoverService: ElemHoverService) {}
}
describe('ElemHoverDirective', () => {
    let fixture: ComponentFixture<ForElemHoverDirectiveTestComponent>;
    let directive: ElemHoverDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [ForElemHoverDirectiveTestComponent],
            providers: [ElemHoverService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).createComponent(ForElemHoverDirectiveTestComponent);
        directive = new ElemHoverDirective(new ElemHoverService());
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    describe('DOM Manipulation with ForElemHoverDirectiveTestComponent', () => {
        let testElem: HTMLElement;
        let hoverElem: HTMLElement;

        beforeEach(() => {
            testElem = fixture.debugElement.query(
                By.css('#testElem'),
            ).nativeElement;
            hoverElem = fixture.debugElement.query(
                By.css('#hoverElem'),
            ).nativeElement;
        });

        it('при mouseover event на testElem, hoverElem должен содержать "testHover"', () => {
            testElem.dispatchEvent(new Event('mouseover'));
            fixture.detectChanges();

            expect(hoverElem.textContent?.trim()).toBe('testHover');
        });

        it('при mouseout event на testElem, hoverElem должен содержать "testHoverOut"', () => {
            testElem.dispatchEvent(new Event('mouseout'));
            fixture.detectChanges();

            expect(hoverElem.textContent?.trim()).toBe('testHoverOut');
        });

        it('при mouseover event должен вызываться onMouseover method', () => {
            jest.spyOn(ElemHoverDirective.prototype as any, 'onMouseover');
            testElem.dispatchEvent(new Event('mouseover'));
            fixture.detectChanges();

            const { onMouseover } = ElemHoverDirective.prototype as any;

            expect(onMouseover).toHaveBeenCalledTimes(1);
        });

        it('при mouseout event должен вызываться onMouseout method', () => {
            jest.spyOn(ElemHoverDirective.prototype as any, 'onMouseout');
            testElem.dispatchEvent(new Event('mouseout'));
            const { onMouseout } = ElemHoverDirective.prototype as any;

            expect(onMouseout).toHaveBeenCalledTimes(1);
        });
    });
});
