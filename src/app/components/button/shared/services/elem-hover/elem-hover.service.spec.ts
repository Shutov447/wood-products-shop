import { TestBed } from '@angular/core/testing';

import { ElemHoverService } from './elem-hover.service';

describe('ElemHoverService', () => {
    let service: ElemHoverService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ElemHoverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
