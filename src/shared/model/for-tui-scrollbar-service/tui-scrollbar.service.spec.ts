import { TestBed } from '@angular/core/testing';

import { TuiScrollbarService } from './tui-scrollbar.service';

describe('TuiScrollbarService', () => {
    let service: TuiScrollbarService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TuiScrollbarService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
