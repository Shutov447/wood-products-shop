import { TestBed } from '@angular/core/testing';
import { ElemHoverService } from './elem-hover.service';

describe('ElemHoverService', () => {
    let service: ElemHoverService;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [ElemHoverService] });

        service = TestBed.inject(ElemHoverService);
    });

    test('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('setHover$', () => {
        let isHovered: boolean | undefined;

        beforeEach(() => {
            isHovered = undefined;
        });

        test('передает в поток false', () => {
            service.setHover$(false);
            service.isHovered$.subscribe((res) => {
                isHovered = res;
            });

            expect(isHovered).toBe(false);
        });

        test('передает в поток true', () => {
            service.setHover$(true);
            service.isHovered$.subscribe((res) => {
                isHovered = res;
            });

            expect(isHovered).toBe(true);
        });
    });
});
