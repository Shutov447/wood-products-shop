import { TestBed } from '@angular/core/testing';

import { SlidersDataService } from './sliders-data.service';

describe('SlidersDataService', () => {
    let service: SlidersDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SlidersDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
