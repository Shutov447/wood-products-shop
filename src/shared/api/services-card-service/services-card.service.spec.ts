import { TestBed } from '@angular/core/testing';

import { ServicesCardService } from './services-card.service';

describe('ServicesCardService', () => {
    let service: ServicesCardService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ServicesCardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
